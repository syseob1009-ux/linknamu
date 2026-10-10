export interface Profile {
  name: string;
  bio: string;
  avatarUrl: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  order: number;
  clicks: number;
}
