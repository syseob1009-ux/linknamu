import type { LinkItem } from "@/types";
import LinkCard from "@/components/LinkCard";

export default function LinkList({ links }: { links: LinkItem[] }) {
  if (links.length === 0) {
    return (
      <p className="text-sm text-amber-600/70">아직 등록된 링크가 없습니다.</p>
    );
  }

  return (
    <ul className="flex w-full flex-col gap-3">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard {...link} />
        </li>
      ))}
    </ul>
  );
}
