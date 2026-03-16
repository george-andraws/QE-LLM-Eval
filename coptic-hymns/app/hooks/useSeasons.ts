"use client";

import { useState, useEffect } from "react";
import { Season } from "../types";

let cachedSeasons: Season[] | null = null;

export function useSeasons() {
  const [seasons, setSeasons] = useState<Season[] | null>(cachedSeasons);
  const [loading, setLoading] = useState(!cachedSeasons);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cachedSeasons) return;
    fetch("/seasons.json")
      .then((r) => r.json())
      .then((data: Season[]) => {
        cachedSeasons = data;
        setSeasons(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(String(e));
        setLoading(false);
      });
  }, []);

  return { seasons, loading, error };
}
