// seed.ts
import { db } from '@/db/drizzle'; // your drizzle db instance
import { shots } from './schema/shot'; // your schema file
import { nanoid } from 'nanoid';

export async function seedShots() {
  await db.insert(shots).values([
  {
    id: nanoid(),
    creator_id: 'user_123',
    slug: 'amazing-illustration',
    title: 'Amazing Illustration',
    description: 'A detailed look at a vibrant illustration.',
    thumbnail_url: 'https://cdn.example.com/thumbnails/shot1.jpg',
    attachments_id: nanoid(),
    comments_id: nanoid(),
    reacts_id: nanoid(),
    views_id: nanoid(),
    tags: ['illustration', 'colorful', 'vector', 'art', 'creative'],
    is_published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: nanoid(),
    creator_id: 'user_456',
    slug: 'branding-concepts',
    title: 'Branding Concepts',
    description: 'Concepts for a new startup branding.',
    thumbnail_url: 'https://cdn.example.com/thumbnails/shot2.jpg',
    attachments_id: nanoid(),
    comments_id: nanoid(),
    reacts_id: nanoid(),
    views_id: nanoid(),
    tags: ['branding', 'logo', 'design', 'identity', 'startup'],
    is_published: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);
}
