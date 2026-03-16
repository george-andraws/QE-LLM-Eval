"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSeasons } from "../hooks/useSeasons";
import { isTextContent } from "../types";
import type { Season, Service, Hymn } from "../types";
import { Suspense } from "react";

interface HymnMatch {
  season: Season;
  service: Service;
  hymn: Hymn;
  matchSnippets: string[];
}

function searchHymns(seasons: Season[], query: string): HymnMatch[] {
  const q = query.toLowerCase();
  const results: HymnMatch[] = [];

  for (const season of seasons) {
    for (const service of season.services) {
      for (const hymn of service.hymns) {
        const snippets: string[] = [];

        // Check hymn name
        if (hymn.name.toLowerCase().includes(q)) {
          snippets.push(hymn.name);
        }

        for (const fmt of hymn.formats) {
          for (const variation of fmt.variations) {
            if (variation.contentType === "Text" && isTextContent(variation.content)) {
              for (const para of variation.content.paragraphs) {
                for (const col of para.columns) {
                  if (col.content.toLowerCase().includes(q)) {
                    // Grab a short snippet around the match
                    const idx = col.content.toLowerCase().indexOf(q);
                    const start = Math.max(0, idx - 40);
                    const end = Math.min(col.content.length, idx + q.length + 40);
                    const snippet = (start > 0 ? "…" : "") + col.content.slice(start, end) + (end < col.content.length ? "…" : "");
                    snippets.push(snippet);
                    if (snippets.length >= 3) break;
                  }
                }
                if (snippets.length >= 3) break;
              }
            }
            if (snippets.length >= 3) break;
          }
          if (snippets.length >= 3) break;
        }

        if (snippets.length > 0) {
          results.push({ season, service, hymn, matchSnippets: snippets.slice(0, 3) });
        }
      }
    }
  }

  return results;
}

function highlight(text: string, query: string) {
  const q = query.toLowerCase();
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <span>{text}</span>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber-200 text-stone-900 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const { seasons, loading, error } = useSeasons();

  const results = useMemo(() => {
    if (!seasons || !query.trim()) return [];
    return searchHymns(seasons, query.trim());
  }, [seasons, query]);

  if (loading) return <p className="text-stone-500">Loading…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!query.trim()) return <p className="text-stone-500">Enter a search term above.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-stone-500 mb-6">
        {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
      </p>
      {results.length === 0 ? (
        <p className="text-stone-500">No hymns found matching &ldquo;{query}&rdquo;.</p>
      ) : (
        <ul className="space-y-3">
          {results.map(({ season, service, hymn, matchSnippets }) => (
            <li key={`${season.id}-${service.id}-${hymn.id}`}>
              <Link
                href={`/seasons/${season.id}/services/${service.id}/hymns/${hymn.id}`}
                className="block p-4 bg-white rounded-lg border border-stone-200 hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <div className="font-medium text-stone-900 mb-1">{highlight(hymn.name, query)}</div>
                <div className="text-xs text-stone-400 mb-2">
                  {season.name} &rsaquo; {service.name}
                </div>
                <ul className="space-y-1">
                  {matchSnippets.map((s, i) => (
                    <li key={i} className="text-sm text-stone-600 italic">
                      {highlight(s, query)}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-stone-500">Loading…</p>}>
      <SearchResults />
    </Suspense>
  );
}