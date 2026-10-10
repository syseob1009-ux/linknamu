"use client";

import { useState } from "react";
import type { Profile } from "@/types";

export default function ProfileForm({ profile }: { profile: Profile }) {
  const [form, setForm] = useState(profile);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");

    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "saved" : "error");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700"
    >
      <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">프로필</h2>
      <label className="flex flex-col gap-1 text-sm">
        이름
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-600"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        한 줄 소개
        <input
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
          className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-600"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        프로필 사진 URL
        <input
          value={form.avatarUrl}
          onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
          className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-600"
        />
      </label>
      <button
        type="submit"
        disabled={status === "saving"}
        className="self-start rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900"
      >
        {status === "saving" ? "저장 중..." : "저장"}
      </button>
      {status === "saved" && (
        <p className="text-sm text-green-600">저장되었습니다.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-500">저장에 실패했습니다.</p>
      )}
    </form>
  );
}
