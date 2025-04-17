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


export interface ShotData{
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export type todoType = {
  id: number;
  text: string;
  done: boolean;
};