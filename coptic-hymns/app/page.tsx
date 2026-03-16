"use client";

import Link from "next/link";
import { useSeasons } from "./hooks/useSeasons";

export default function Home() {
  const { seasons, loading, error } = useSeasons();

  if (loading) return <p className="text-stone-500">Loading seasons…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Seasons</h1>
      <p className="text-stone-500 mb-6">{seasons!.length} seasons available</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {seasons!
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((season) => (
            <li key={season.id}>
              <Link
                href={`/seasons/${season.id}`}
                className="block p-4 bg-white rounded-lg border border-stone-200 hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <span className="font-medium text-stone-900">{season.name}</span>
                <span className="ml-2 text-sm text-stone-400">
                  {season.serviceCount} service{season.serviceCount !== 1 ? "s" : ""}
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}