import Image from "next/image";
import type { Profile } from "@/types";

export default function ProfileHeader({ name, bio, avatarUrl }: Profile) {
  return (
    <header className="flex flex-col items-center gap-3 text-center">
      <Image
        src={avatarUrl}
        alt={`${name} 프로필 사진`}
        width={96}
        height={96}
        className="h-24 w-24 rounded-full border-4 border-rose-400 object-cover"
      />
      <h1 className="text-xl font-bold text-amber-600">{name}</h1>
      <p className="max-w-xs text-sm font-medium text-amber-600/80">{bio}</p>
    </header>
  );
}
