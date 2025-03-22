export interface AcceptedFile extends File {

  preview: string;
}


export interface ShotItem {
  id: number
  type: 'text' | 'image' | 'video';
  content: AcceptedFile;
}
