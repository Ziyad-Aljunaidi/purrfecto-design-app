export interface AcceptedFile extends File {
  preview: string;
}


export interface ShotItem {
  id: number
  type: 'text' | 'image' | 'video';
  content: AcceptedFile;
}

export interface CreateShotErrors {
  shotTitleError?: string;
  mediaFilesError?: string;
  thumbnailError?: string;
}

export interface CreateShotTag {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
}


export interface ShotData{
  // export const shots = pgTable('shots', {
  //   id: uuid('id').defaultRandom().primaryKey(),
  //   userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  //   title: text('title').notNull(),
  //   description: text('description'),
  //   thumbnailUrl: text('image_url').notNull(),
  //   // media:[text('media_url').notNull()],
  //   views: integer('views').default(0),
  //   createdAt: timestamp('created_at').defaultNow(),
  //   updatedAt: timestamp('updated_at').defaultNow(),
  // });

  id: string;
  userId: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}
export type todoType = {
  id: number;
  text: string;
  done: boolean;
};