import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { createLink } from "@/lib/data";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, url } = body;

  if (typeof title !== "string" || typeof url !== "string" || !title || !url) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const link = await createLink({ title, url });
  return NextResponse.json(link, { status: 201 });
}
