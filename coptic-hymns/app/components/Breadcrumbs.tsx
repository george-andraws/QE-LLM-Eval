import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-stone-500 mb-6 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-stone-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-amber-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-800 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}