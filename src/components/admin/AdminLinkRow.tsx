"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { LinkItem } from "@/types";

export default function AdminLinkRow({ link }: { link: LinkItem }) {
  const router = useRouter();
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [order, setOrder] = useState(link.order);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/admin/links/${link.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url, order }),
    });
    setSaving(false);
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm(`"${link.title}" 링크를 삭제할까요?`)) return;
    await fetch(`/api/admin/links/${link.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <li className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-3 sm:flex-row sm:items-center dark:border-zinc-700">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 rounded-lg border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-600"
        placeholder="제목"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-[2] rounded-lg border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-600"
        placeholder="URL"
      />
      <input
        type="number"
        value={order}
        onChange={(e) => setOrder(Number(e.target.value))}
        className="w-16 rounded-lg border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-600"
        title="순서"
      />
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        클릭 {link.clicks}
      </span>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
        >
          저장
        </button>
        <button
          onClick={handleDelete}
          className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-600 dark:border-red-700 dark:text-red-400"
        >
          삭제
        </button>
      </div>
    </li>
  );
}
