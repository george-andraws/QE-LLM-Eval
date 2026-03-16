"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSeasons } from "../../hooks/useSeasons";
import Breadcrumbs from "../../components/Breadcrumbs";

export default function SeasonPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const { seasons, loading, error } = useSeasons();

  if (loading) return <p className="text-stone-500">Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  const season = seasons!.find((s) => s.id === seasonId);
  if (!season) return <p className="text-red-600">Season not found.</p>;

  const services = [...season.services].sort((a, b) => a.order - b.order);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Seasons", href: "/" }, { label: season.name }]} />
      <h1 className="text-3xl font-bold mb-2">{season.name}</h1>
      <p className="text-stone-500 mb-6">{services.length} service{services.length !== 1 ? "s" : ""}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((svc) => (
          <li key={svc.id}>
            <Link
              href={`/seasons/${seasonId}/services/${svc.id}`}
              className="block p-4 bg-white rounded-lg border border-stone-200 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-stone-900">{svc.name}</span>
              <span className="ml-2 text-sm text-stone-400">
                {svc.hymns.length} hymn{svc.hymns.length !== 1 ? "s" : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}