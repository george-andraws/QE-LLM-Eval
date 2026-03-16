"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <header className="bg-stone-800 text-stone-100 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Link href="/" className="text-xl font-semibold tracking-wide hover:text-amber-300 transition-colors shrink-0">
          Coptic Hymns
        </Link>
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:max-w-md sm:ml-auto">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hymns…"
            className="flex-1 px-3 py-1.5 rounded bg-stone-700 text-stone-100 placeholder-stone-400 border border-stone-600 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 rounded font-medium transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}