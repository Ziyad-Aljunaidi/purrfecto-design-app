import { JSX } from 'react';

export type PrProject = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  gallery: string[];
  layout: "bento" | "list";
  tags: string[];
  links: string[] | null;
  creator_id: string[];
  created_at: Date;
  updated_at: Date;
  status: "draft" | "published";
  visibility: "public" | "private";
}

// demo sortable list
export type Item = {
  id: number;
  content: string | JSX.Element;
}

export const userIdTest = "1234567890abcdef1234567890abcdef"; // Example user ID for testing purposes