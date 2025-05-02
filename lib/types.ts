export interface AcceptedFile extends File {
  preview: string;
}
export interface ShotItem {
  id: number;
  type: "text" | "heading" | "image" | "video" | "cta";
  content: AcceptedFile;
}
export interface CreateShotErrors {
  shotTitleError?: string;
  mediaFilesError?: string;
  thumbnailError?: string;
  descriptionError?: string;
  tagsError?: string;
}
export interface CreateShotTag {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  maxTags: number;
  // errorSetter: React.Dispatch<React.SetStateAction<CreateShotErrors | null>>;
  // error: CreateShotErrors | null;
}

export interface Attachments {
  type: string;
  source: string;
}
export interface ShotData {
  creatorId: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  isPublished: boolean;
  attachmentsId: string;
  attachments: Attachments[];
  createdAt: Date;
  updatedAt: Date;
}

export interface richUser {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: boolean;
  image?: string | null;
  username?: string;
  displayUsername?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
