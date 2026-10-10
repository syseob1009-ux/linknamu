import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { getLinks, getProfile } from "@/lib/data";

export const revalidate = 0;

export default async function Home() {
  const [profile, links] = await Promise.all([getProfile(), getLinks()]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-10 dark:bg-zinc-950">
      <main className="flex w-full max-w-sm flex-col items-center gap-8 rounded-[2.5rem] border-4 border-amber-400 bg-amber-100 px-6 py-10 shadow-sm">
        <ProfileHeader {...profile} />
        <LinkList links={links} />
      </main>
    </div>
  );
}
