"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddLinkForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch("/api/admin/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, url }),
    });

    setSaving(false);

    if (!res.ok) {
      setError("링크 추가에 실패했습니다.");
      return;
    }

    setTitle("");
    setUrl("");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-lg border border-dashed border-zinc-300 p-3 sm:flex-row sm:items-center dark:border-zinc-600"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        required
        className="flex-1 rounded-lg border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-600"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://..."
        required
        className="flex-[2] rounded-lg border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-600"
      />
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium text-white disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
      >
        {saving ? "추가 중..." : "링크 추가"}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
}
