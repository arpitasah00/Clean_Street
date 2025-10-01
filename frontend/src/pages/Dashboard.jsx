import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

export default function Dashboard() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    api("/complaints/mine", { token })
      .then((data) => mounted && setItems(data))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [token]);

  const counts = useMemo(
    () => ({
      total: items.length,
      received: items.filter((i) => i.status === "received").length,
      in_review: items.filter((i) => i.status === "in_review").length,
      resolved: items.filter((i) => i.status === "resolved").length,
    }),
    [items]
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display mb-4">Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Stat label="Total Issues" value={counts.total} />
            <Stat label="Pending" value={counts.in_review} />
            <Stat label="Resolve" value={counts.resolved} />
            <Stat label="In Progress" value={counts.received} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
            <div className="rounded-xl border border-gray-200 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-medium">Activity</h2>
                <span className="text-xs text-green-600 bg-green-50 border border-green-200 rounded-md px-2 py-0.5">
                  Live Updates
                </span>
              </div>
              <ul className="divide-y divide-gray-100">
                {items.map((i) => (
                  <li
                    key={i._id}
                    className="px-4 py-3 flex items-start justify-between"
                  >
                    <div>
                      <p className="font-medium">{i.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(i.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{i.status}</span>
                  </li>
                ))}
                {items.length === 0 && (
                  <li className="px-4 py-6 text-center text-gray-500">
                    No complaints yet.
                  </li>
                )}
              </ul>
            </div>

            <aside className="space-y-4">
              <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="font-medium mb-2">Quick Action</h3>
                <div className="space-y-2">
                  <a href="/report" className="btn btn-primary w-full">
                    Report New Issue
                  </a>
                  <a href="/complaints" className="btn btn-ghost w-full">
                    My Complaints
                  </a>
                </div>
              </div>
              <div className="rounded-xl border border-gray-200 p-4">
                <h3 className="font-medium mb-2">Support Team</h3>
                <button className="btn btn-ghost w-full">
                  Contact Support
                </button>
              </div>
            </aside>
          </div>
        </>
      )}
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 px-4 py-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
