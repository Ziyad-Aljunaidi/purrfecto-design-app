import React from 'react';
import { AcceptedFile } from '@/lib/types';

const MediaPickerContext = React.createContext<{
  mediaFiles: AcceptedFile[];
  setMediaFiles: React.Dispatch<React.SetStateAction<AcceptedFile[]>>;
}>({
  mediaFiles:[],
  setMediaFiles: () => {},
});
export default MediaPickerContext