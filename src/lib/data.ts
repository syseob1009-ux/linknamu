import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { LinkItem, Profile } from "@/types";

interface LinkDoc {
  _id: ObjectId;
  title: string;
  url: string;
  order: number;
  clicks: number;
}

const FALLBACK_PROFILE: Profile = {
  name: "링크나무",
  bio: "내 모든 링크를 한 곳에 모아보세요",
  avatarUrl: "/avatar-placeholder.svg",
};

export async function getProfile(): Promise<Profile> {
  const db = await getDb();
  const doc = await db.collection<Profile>("profile").findOne({});
  return doc ?? FALLBACK_PROFILE;
}

export async function getLinks(): Promise<LinkItem[]> {
  const db = await getDb();
  const docs = await db
    .collection<LinkDoc>("links")
    .find({})
    .sort({ order: 1 })
    .toArray();

  return docs.map((doc) => ({
    id: doc._id.toHexString(),
    title: doc.title,
    url: doc.url,
    order: doc.order,
    clicks: doc.clicks ?? 0,
  }));
}

export async function getLinkById(id: string): Promise<LinkItem | null> {
  if (!ObjectId.isValid(id)) return null;

  const db = await getDb();
  const doc = await db
    .collection<LinkDoc>("links")
    .findOne({ _id: new ObjectId(id) });

  if (!doc) return null;

  return {
    id: doc._id.toHexString(),
    title: doc.title,
    url: doc.url,
    order: doc.order,
    clicks: doc.clicks ?? 0,
  };
}

export async function incrementClick(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;

  const db = await getDb();
  await db
    .collection<LinkDoc>("links")
    .updateOne({ _id: new ObjectId(id) }, { $inc: { clicks: 1 } });
}

export async function updateProfile(profile: Profile): Promise<void> {
  const db = await getDb();
  await db
    .collection<Profile>("profile")
    .updateOne({}, { $set: profile }, { upsert: true });
}

export async function createLink(input: {
  title: string;
  url: string;
}): Promise<LinkItem> {
  const db = await getDb();
  const collection = db.collection<LinkDoc>("links");

  const last = await collection
    .find({})
    .sort({ order: -1 })
    .limit(1)
    .toArray();
  const nextOrder = (last[0]?.order ?? 0) + 1;

  const { insertedId } = await collection.insertOne({
    _id: new ObjectId(),
    title: input.title,
    url: input.url,
    order: nextOrder,
    clicks: 0,
  });

  return {
    id: insertedId.toHexString(),
    title: input.title,
    url: input.url,
    order: nextOrder,
    clicks: 0,
  };
}

export async function updateLink(
  id: string,
  updates: Partial<Pick<LinkItem, "title" | "url" | "order">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;

  const db = await getDb();
  await db
    .collection<LinkDoc>("links")
    .updateOne({ _id: new ObjectId(id) }, { $set: updates });
}

export async function deleteLink(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;

  const db = await getDb();
  await db.collection<LinkDoc>("links").deleteOne({ _id: new ObjectId(id) });
}
