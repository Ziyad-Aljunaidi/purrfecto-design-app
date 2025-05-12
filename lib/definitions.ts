export interface Shot {
  id: string;
  creator_id: string;
  slug: string;
  title: string;
  description: string | null;
  thumbnail_url: string;
  attachment_id: string;
  comments_id: string;
  likes_id: string;
  views_id: string;
  tags: string[];
  is_published: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Creator {
  id: string;
  userId: string;
  username: string;
  displayUsername: string;
  name: string;
  email: string;
  links: string[] | null;
  bio: string | null;
  avatar_url: string[];
  banner_url: string | null;
  location: {city: string | null; country: string | null} | null;
  website: string | null;
  is_verified: boolean | null;
  total_shots: number | null;
  total_views: number | null;
  total_likes: number | null;
  total_followers: number | null;
  total_following: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Attachment  {
  id: string;
  shot_id: string;
  attachments: { type: string; source: string }[] | null;
  createdAt: Date;
  updatedAt: Date;
  is_published: boolean | null;
};
