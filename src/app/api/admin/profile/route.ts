import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { updateProfile } from "@/lib/data";

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, bio, avatarUrl } = body;

  if (
    typeof name !== "string" ||
    typeof bio !== "string" ||
    typeof avatarUrl !== "string"
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await updateProfile({ name, bio, avatarUrl });
  return NextResponse.json({ ok: true });
}
