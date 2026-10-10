import type { LinkItem } from "@/types";
import AdminLinkRow from "@/components/admin/AdminLinkRow";
import AddLinkForm from "@/components/admin/AddLinkForm";

export default function LinkManager({ links }: { links: LinkItem[] }) {
  return (
    <section className="flex w-full flex-col gap-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
      <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">링크</h2>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <AdminLinkRow key={link.id} link={link} />
        ))}
      </ul>
      <AddLinkForm />
    </section>
  );
}
