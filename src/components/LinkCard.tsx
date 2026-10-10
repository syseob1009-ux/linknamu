import type { LinkItem } from "@/types";

export default function LinkCard({ id, title }: LinkItem) {
  return (
    <a
      href={`/r/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center rounded-2xl border-2 border-pink-600 bg-white/60 px-5 py-4 text-center font-semibold text-pink-700 shadow-sm transition-colors hover:bg-white"
    >
      {title}
    </a>
  );
}
