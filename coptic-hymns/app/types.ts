export interface Column {
  content: string;
  language: string;
}

export interface Paragraph {
  columns: Column[];
}

export interface TextContent {
  paragraphs: Paragraph[];
}

export interface HazzatContent {
  englishHazzat: string | null;
  copticHazzat: string | null;
  arabicHazzat: string | null;
  contentType: string;
}

export type VariationContent = TextContent | HazzatContent | null;

export interface Variation {
  id: string;
  name: string;
  order: number;
  contentType: string;
  content: VariationContent;
}

export interface Format {
  id: string;
  name: string;
  order: number;
  variations: Variation[];
}

export interface Hymn {
  id: string;
  name: string;
  order: number;
  formats: Format[];
}

export interface Service {
  id: string;
  name: string;
  order: number;
  seasonId: string;
  hymns: Hymn[];
}

export interface Season {
  id: string;
  name: string;
  isDateSpecific: boolean;
  order: number;
  verse: string;
  serviceCount: number;
  serviceIds: string[];
  dateRanges: unknown[];
  services: Service[];
}

export function isTextContent(content: VariationContent): content is TextContent {
  return content !== null && 'paragraphs' in content;
}

export function isHazzatContent(content: VariationContent): content is HazzatContent {
  return content !== null && 'copticHazzat' in content;
}

export function normalizeLanguage(lang: string): string {
  return lang.toLowerCase();
}
