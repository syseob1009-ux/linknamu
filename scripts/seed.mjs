// 초기 프로필/링크 데이터를 MongoDB에 넣는 시드 스크립트
// 실행: npm run seed
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "link-namu";

if (!uri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

const profile = {
  name: "신윤섭",
  bio: "개발자 · 창작자",
  avatarUrl: "/avatar-placeholder.svg",
};

const links = [
  { title: "GitHub", url: "https://github.com/", order: 1, clicks: 0 },
  { title: "LinkedIn", url: "https://linkedin.com/", order: 2, clicks: 0 },
  { title: "Blog", url: "https://example.com/blog", order: 3, clicks: 0 },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);

  await db.collection("profile").deleteMany({});
  await db.collection("profile").insertOne(profile);

  await db.collection("links").deleteMany({});
  await db.collection("links").insertMany(links);

  console.log("Seed complete.");
} finally {
  await client.close();
}
