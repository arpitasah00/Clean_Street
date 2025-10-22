import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

export default function Complaints() {
  const { token, user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  const [statusBusy, setStatusBusy] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [summaries, setSummaries] = useState({}); // { [id]: { up, down, comments } }
  const [myVotes, setMyVotes] = useState({}); // { [id]: 'up'|'down'|null }
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentBusy, setCommentBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    api("/complaints", { token })
      .then((data) => {
        if (!mounted) return;
        setItems(data);
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [token]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [selected?._id]);

  const remove = async (id) => {
    try {
      setBusy(true);
      await api(`/complaints/${id}`, { method: "DELETE", token });
      setItems((prev) => prev.filter((x) => x._id !== id));
      setSelected(null);
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  };

  const canDelete = (c) => user && c && String(c.user_id) === String(user.id);
  const canUpdateStatus = () =>
    user && (user.role === "admin" || user.role === "volunteer");

  const updateStatus = async (c, nextStatus) => {
    if (!c || !nextStatus) return;
    try {
      setStatusBusy(c._id);
      const body = { status: nextStatus };
      if (user && user.name) body.assigned_to = user.name;
      const updated = await api(`/complaints/${c._id}/status`, {
        method: "PATCH",
        token,
        body,
      });
      setItems((prev) =>
        prev.map((x) => (x._id === updated._id ? updated : x))
      );
      if (selected && selected._id === c._id) setSelected(updated);
    } catch (e) {
      alert(e.message);
    } finally {
      setStatusBusy(null);
    }
  };

  // Fetch vote summaries and comment counts for visible complaints
  useEffect(() => {
    let mounted = true;
    const loadExtras = async () => {
      try {
        const entries = await Promise.all(
          items.map(async (c) => {
            try {
              const [v, comments] = await Promise.all([
                api(`/votes/${c._id}/summary`, { token }),
                api(`/comments/${c._id}`, { token }),
              ]);
              return [
                c._id,
                {
                  up: v.up || 0,
                  down: v.down || 0,
                  comments: Array.isArray(comments) ? comments.length : 0,
                },
              ];
            } catch (_) {
              return [c._id, { up: 0, down: 0, comments: 0 }];
            }
          })
        );
        if (!mounted) return;
        const next = {};
        for (const [id, v] of entries) next[id] = v;
        setSummaries(next);
      } catch {
        // ignore extras errors
      }
    };
    if (items.length) loadExtras();
    return () => {
      mounted = false;
    };
  }, [items, token]);

  const toggleVote = async (c, type) => {
    if (!c) return;
    try {
      const current = myVotes[c._id] || null;
      const nextType = current === type ? null : type; // toggle off if same
      await api(`/votes/${c._id}`, {
        method: "POST",
        token,
        body: { vote_type: nextType },
      });
      setMyVotes((prev) => ({ ...prev, [c._id]: nextType }));
      setSummaries((prev) => {
        const s = prev[c._id] || { up: 0, down: 0, comments: 0 };
        let { up, down } = s;
        // remove previous
        if (current === "up") up = Math.max(0, up - 1);
        if (current === "down") down = Math.max(0, down - 1);
        // add new
        if (nextType === "up") up += 1;
        if (nextType === "down") down += 1;
        return { ...prev, [c._id]: { ...s, up, down } };
      });
    } catch (e) {
      alert(e.message);
    }
  };

  const openComments = async (c) => {
    setSelected(c);
    setShowComments(true);
    setComments([]);
    setCommentText("");
    setCommentsLoading(true);
    try {
      const list = await api(`/comments/${c._id}`, { token });
      setComments(Array.isArray(list) ? list : []);
    } catch (e) {
      // ignore, show empty state
    } finally {
      setCommentsLoading(false);
    }
  };

  const submitComment = async () => {
    const content = (commentText || "").trim();
    if (!selected || !content) return;
    try {
      setCommentBusy(true);
      const created = await api(`/comments/${selected._id}`, {
        method: "POST",
        token,
        body: { content },
      });
      setComments((prev) => [...prev, created]);
      setCommentText("");
      // bump count in summaries
      setSummaries((prev) => {
        const s = prev[selected._id] || { up: 0, down: 0, comments: 0 };
        return {
          ...prev,
          [selected._id]: { ...s, comments: (s.comments || 0) + 1 },
        };
      });
    } catch (e) {
      alert(e.message);
    } finally {
      setCommentBusy(false);
    }
  };

  const canDeleteComment = (com) =>
    user && (String(com.user_id) === String(user.id) || user.role === "admin");
  const removeComment = async (com) => {
    if (!com || !com._id) return;
    try {
      setCommentBusy(true);
      await api(`/comments/${com._id}`, { method: "DELETE", token });
      setComments((prev) => prev.filter((x) => x._id !== com._id));
      setSummaries((prev) => {
        const s = prev[selected._id] || { up: 0, down: 0, comments: 0 };
        return {
          ...prev,
          [selected._id]: {
            ...s,
            comments: Math.max(0, (s.comments || 0) - 1),
          },
        };
      });
    } catch (e) {
      alert(e.message);
    } finally {
      setCommentBusy(false);
    }
  };

  const cardIcon = (title = "") => {
    const t = title.toLowerCase();
    if (t.includes("pothole")) return "•";
    if (t.includes("streetlight") || t.includes("light")) return "💡";
    if (t.includes("garbage") || t.includes("trash")) return "🗑️";
    if (t.includes("water") || t.includes("leak")) return "💧";
    return "•";
  };

  const timeAgo = (iso) => {
    if (!iso) return "";
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - then);
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display mb-4">All Complaints</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((c) => {
            const s = summaries[c._id] || { up: 0, down: 0, comments: 0 };
            return (
              <div
                key={c._id}
                className="rounded-xl border border-gray-200 p-4 bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl leading-none">
                      {cardIcon(c.title)}
                    </span>
                    <h3 className="font-semibold text-gray-900 leading-snug line-clamp-2">
                      {c.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {canUpdateStatus() ? (
                      <select
                        className="px-2 py-1 text-xs rounded-full border border-gray-200 bg-blue-50 text-blue-700"
                        value={c.status}
                        disabled={statusBusy === c._id}
                        onChange={(e) => updateStatus(c, e.target.value)}
                        title="Change status"
                      >
                        <option value="received">Received</option>
                        <option value="in_review">In Review</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                        {prettyStatus(c.status)}
                      </span>
                    )}
                  </div>
                </div>

                {c.description && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {c.description}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                  {c.address && (
                    <div className="flex items-center gap-1">
                      <span>📍</span>
                      <span
                        className="truncate max-w-[260px]"
                        title={c.address}
                      >
                        {c.address}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span>🕒</span>
                    <span>{timeAgo(c.created_at)}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      className={`px-2 py-1 rounded border text-sm flex items-center gap-1 ${
                        myVotes[c._id] === "up"
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => toggleVote(c, "up")}
                    >
                      <span>👍</span>
                      <span>{s.up}</span>
                    </button>
                    <button
                      className={`px-2 py-1 rounded border text-sm flex items-center gap-1 ${
                        myVotes[c._id] === "down"
                          ? "bg-gray-900 text-white border-gray-900"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => toggleVote(c, "down")}
                    >
                      <span>👎</span>
                      <span>{s.down}</span>
                    </button>
                    <button
                      className="px-2 py-1 rounded border border-gray-200 text-sm flex items-center gap-1 hover:bg-gray-50"
                      onClick={() => openComments(c)}
                    >
                      <span>💬</span>
                      <span>Comments ({s.comments})</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => {
                        setShowComments(false);
                        setSelected(c);
                      }}
                    >
                      View Details
                    </button>
                    {canDelete(c) && (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          setShowComments(false);
                          setSelected(c);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <div className="text-gray-500">No complaints yet.</div>
          )}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            if (!busy) {
              setShowComments(false);
              setSelected(null);
            }
          }}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">{selected.title}</h3>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  if (!busy) {
                    setShowComments(false);
                    setSelected(null);
                  }
                }}
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-[70vh] overflow-auto">
              {!showComments &&
                selected.photos &&
                selected.photos.length > 0 && (
                  <div className="relative w-full">
                    <img
                      src={selected.photos[photoIndex]}
                      alt={`photo-${photoIndex + 1}`}
                      className="w-full max-h-64 object-contain rounded"
                    />
                    {selected.photos.length > 1 && (
                      <>
                        <button
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={() =>
                            setPhotoIndex(
                              (i) =>
                                (i - 1 + selected.photos.length) %
                                selected.photos.length
                            )
                          }
                          aria-label="Previous photo"
                        >
                          ‹
                        </button>
                        <button
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={() =>
                            setPhotoIndex(
                              (i) => (i + 1) % selected.photos.length
                            )
                          }
                          aria-label="Next photo"
                        >
                          ›
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs rounded px-2 py-0.5">
                          {photoIndex + 1} / {selected.photos.length}
                        </div>
                      </>
                    )}
                  </div>
                )}
              {!showComments && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        selected.status === "in_review"
                          ? "bg-blue-100 text-blue-700"
                          : selected.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {prettyStatus(selected.status)}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    {selected.title}
                  </h3>
                  {selected.description && (
                    <div className="text-sm text-gray-700 mb-2 whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {selected.description}
                    </div>
                  )}
                  <div className="text-sm text-gray-700 mb-1">
                    <span className="font-semibold">Reported:</span>{" "}
                    {selected.created_at
                      ? new Date(selected.created_at).toLocaleDateString()
                      : "N/A"}
                  </div>
                  {selected.address && (
                    <div className="flex items-center gap-1 text-sm text-gray-700 mb-1">
                      <span>📍</span>
                      <span
                        className="truncate max-w-[220px]"
                        title={selected.address}
                      >
                        {selected.address}
                      </span>
                    </div>
                  )}
                </>
              )}
              {showComments && (
                <div className="space-y-3">
                  <h4 className="font-medium">Comments</h4>
                  {commentsLoading ? (
                    <div className="text-sm text-gray-500">
                      Loading comments...
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="text-sm text-gray-500">
                      No comments yet.
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {comments.map((cm) => (
                        <li
                          key={cm._id}
                          className="border border-gray-200 rounded p-2 text-sm flex items-start justify-between gap-2"
                        >
                          <div className="whitespace-pre-wrap break-words">
                            {cm.content}
                          </div>
                          {canDeleteComment(cm) && (
                            <button
                              className="text-xs text-red-600 hover:underline"
                              onClick={() => removeComment(cm)}
                              disabled={commentBusy}
                            >
                              Delete
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 input"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitComment();
                      }}
                    />
                    <button
                      className="btn"
                      onClick={submitComment}
                      disabled={commentBusy || !commentText.trim()}
                    >
                      {commentBusy ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex items-center justify-end gap-2">
              {canDelete(selected) && (
                <button
                  className="btn btn-danger"
                  disabled={busy}
                  onClick={() => remove(selected._id)}
                >
                  {busy ? "Deleting..." : "Delete Complaint"}
                </button>
              )}
              <button
                className="btn"
                onClick={() => !busy && setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function prettyStatus(s) {
  if (s === "in_review") return "In Review";
  return s ? s[0].toUpperCase() + s.slice(1).replace("_", " ") : "";
}
