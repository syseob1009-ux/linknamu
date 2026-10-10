import { NextResponse } from "next/server";
import { getLinkById, incrementClick } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const link = await getLinkById(id);

  if (!link) {
    return NextResponse.redirect(new URL("/", _request.url));
  }

  await incrementClick(id);

  return NextResponse.redirect(link.url);
}
