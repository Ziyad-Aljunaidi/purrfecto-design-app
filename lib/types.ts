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

export type todoType = {
  id: number;
  text: string;
  done: boolean;
};