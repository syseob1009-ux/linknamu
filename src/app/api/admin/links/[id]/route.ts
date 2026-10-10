import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteLink, updateLink } from "@/lib/data";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const updates: Partial<{ title: string; url: string; order: number }> = {};

  if (typeof body.title === "string") updates.title = body.title;
  if (typeof body.url === "string") updates.url = body.url;
  if (typeof body.order === "number") updates.order = body.order;

  await updateLink(id, updates);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteLink(id);
  return NextResponse.json({ ok: true });
}
