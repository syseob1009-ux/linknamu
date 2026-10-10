import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getLinks, getProfile } from "@/lib/data";
import ProfileForm from "@/components/admin/ProfileForm";
import LinkManager from "@/components/admin/LinkManager";
import LogoutButton from "@/components/admin/LogoutButton";

export const revalidate = 0;

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const [profile, links] = await Promise.all([getProfile(), getLinks()]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <main className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            관리자
          </h1>
          <LogoutButton />
        </div>
        <ProfileForm profile={profile} />
        <LinkManager links={links} />
      </main>
    </div>
  );
}
