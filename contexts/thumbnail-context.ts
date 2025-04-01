import React from 'react';
import { AcceptedFile } from '@/lib/types';

const ThumbnailContext = React.createContext<{
  thumbnail: AcceptedFile | null;
  setThumbnail: React.Dispatch<React.SetStateAction<AcceptedFile | null>>;
}>({
  thumbnail: null,
  setThumbnail: () => {},
});
export default ThumbnailContext;