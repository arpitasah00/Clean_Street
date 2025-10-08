import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

export default function Complaints() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api("/complaints", { token })
      .then((data) => mounted && setItems(data))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [token]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display mb-4">All Complaints</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-3">
          {items.map((c) => (
            <li key={c._id} className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{c.title}</h3>
                <span className="text-xs text-gray-500">{c.status}</span>
              </div>
              {c.description && (
                <p className="text-sm text-gray-600 mt-1">{c.description}</p>
              )}
            </li>
          ))}
          {items.length === 0 && (
            <li className="text-gray-500">No complaints yet.</li>
          )}
        </ul>
      )}
    </section>
  );
}
