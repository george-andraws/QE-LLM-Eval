"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useSeasons } from "../../../../hooks/useSeasons";
import Breadcrumbs from "../../../../components/Breadcrumbs";

export default function ServicePage() {
  const { seasonId, serviceId } = useParams<{ seasonId: string; serviceId: string }>();
  const { seasons, loading, error } = useSeasons();

  if (loading) return <p className="text-stone-500">Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  const season = seasons!.find((s) => s.id === seasonId);
  if (!season) return <p className="text-red-600">Season not found.</p>;

  const service = season.services.find((s) => s.id === serviceId);
  if (!service) return <p className="text-red-600">Service not found.</p>;

  const hymns = [...service.hymns].sort((a, b) => a.order - b.order);

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Seasons", href: "/" },
          { label: season.name, href: `/seasons/${seasonId}` },
          { label: service.name },
        ]}
      />
      <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
      <p className="text-stone-500 mb-6">{hymns.length} hymn{hymns.length !== 1 ? "s" : ""}</p>
      <ul className="space-y-2">
        {hymns.map((hymn) => (
          <li key={hymn.id}>
            <Link
              href={`/seasons/${seasonId}/services/${serviceId}/hymns/${hymn.id}`}
              className="block p-4 bg-white rounded-lg border border-stone-200 hover:border-amber-400 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-stone-900">{hymn.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}