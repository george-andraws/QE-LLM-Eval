"use client";

import { useParams } from "next/navigation";
import { useSeasons } from "../../../../../../hooks/useSeasons";
import Breadcrumbs from "../../../../../../components/Breadcrumbs";
import { isTextContent, isHazzatContent, Variation } from "../../../../../../types";

function getColumnByLanguage(columns: { content: string; language: string }[], lang: string) {
  return columns.find((c) => c.language.toLowerCase() === lang.toLowerCase());
}

function TextVariation({ variation }: { variation: Variation }) {
  if (!isTextContent(variation.content)) return null;
  const { paragraphs } = variation.content;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-stone-100 text-stone-600 text-xs uppercase tracking-wide">
            <th className="p-3 text-left border-b border-stone-200 w-1/3">English</th>
            <th className="p-3 text-left border-b border-stone-200 w-1/3">Coptic</th>
            <th className="p-3 text-right border-b border-stone-200 w-1/3" dir="rtl">Arabic</th>
          </tr>
        </thead>
        <tbody>
          {paragraphs.map((para, i) => {
            const en = getColumnByLanguage(para.columns, "english");
            const co = getColumnByLanguage(para.columns, "coptic");
            const ar = getColumnByLanguage(para.columns, "arabic");
            return (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                <td className="p-3 align-top border-b border-stone-100 leading-relaxed">{en?.content ?? ""}</td>
                <td className="p-3 align-top border-b border-stone-100 leading-relaxed CopticFont">{co?.content ?? ""}</td>
                <td className="p-3 align-top border-b border-stone-100 leading-relaxed text-right" dir="rtl">{ar?.content ?? ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function HazzatSection({ variation }: { variation: Variation }) {
  if (!isHazzatContent(variation.content)) return null;
  const { englishHazzat, copticHazzat, arabicHazzat } = variation.content;

  if (!englishHazzat && !copticHazzat && !arabicHazzat) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-stone-700">Hazzat (Musical Notation)</h3>
      {(englishHazzat || copticHazzat) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {englishHazzat && (
            <div>
              <h4 className="text-sm font-medium text-stone-500 mb-2 uppercase tracking-wide">English</h4>
              <div
                className="p-4 bg-white border border-stone-200 rounded overflow-x-auto text-sm"
                dangerouslySetInnerHTML={{ __html: englishHazzat }}
              />
            </div>
          )}
          {copticHazzat && (
            <div>
              <h4 className="text-sm font-medium text-stone-500 mb-2 uppercase tracking-wide">Coptic</h4>
              <div
                className="p-4 bg-white border border-stone-200 rounded overflow-x-auto text-sm"
                dangerouslySetInnerHTML={{ __html: copticHazzat }}
              />
            </div>
          )}
        </div>
      )}
      {arabicHazzat && (
        <div dir="rtl">
          <h4 className="text-sm font-medium text-stone-500 mb-2 uppercase tracking-wide">Arabic</h4>
          <div
            className="p-4 bg-white border border-stone-200 rounded overflow-x-auto text-sm"
            dangerouslySetInnerHTML={{ __html: arabicHazzat }}
          />
        </div>
      )}
    </div>
  );
}

export default function HymnPage() {
  const { seasonId, serviceId, hymnId } = useParams<{
    seasonId: string;
    serviceId: string;
    hymnId: string;
  }>();
  const { seasons, loading, error } = useSeasons();

  if (loading) return <p className="text-stone-500">Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  const season = seasons!.find((s) => s.id === seasonId);
  if (!season) return <p className="text-red-600">Season not found.</p>;

  const service = season.services.find((s) => s.id === serviceId);
  if (!service) return <p className="text-red-600">Service not found.</p>;

  const hymn = service.hymns.find((h) => h.id === hymnId);
  if (!hymn) return <p className="text-red-600">Hymn not found.</p>;

  // Collect text and hazzat variations across all formats
  const textVariations: Variation[] = [];
  const hazzatVariations: Variation[] = [];

  for (const fmt of hymn.formats) {
    for (const variation of fmt.variations) {
      if (variation.contentType === "Text" && isTextContent(variation.content)) {
        textVariations.push(variation);
      } else if (
        (variation.contentType === "Hazzat" || variation.contentType === "VerticalHazzat") &&
        isHazzatContent(variation.content)
      ) {
        hazzatVariations.push(variation);
      }
    }
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Seasons", href: "/" },
          { label: season.name, href: `/seasons/${seasonId}` },
          { label: service.name, href: `/seasons/${seasonId}/services/${serviceId}` },
          { label: hymn.name },
        ]}
      />
      <h1 className="text-3xl font-bold mb-6">{hymn.name}</h1>

      {textVariations.length === 0 && hazzatVariations.length === 0 && (
        <p className="text-stone-500">No text or hazzat content available for this hymn.</p>
      )}

      {textVariations.map((variation, i) => (
        <div key={variation.id} className="mb-8">
          {textVariations.length > 1 && (
            <h2 className="text-lg font-semibold mb-3 text-stone-600">{variation.name}</h2>
          )}
          <TextVariation variation={variation} />
        </div>
      ))}

      {hazzatVariations.map((variation) => (
        <HazzatSection key={variation.id} variation={variation} />
      ))}
    </div>
  );
}