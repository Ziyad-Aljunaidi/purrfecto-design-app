
// import { ShotItem} from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
// import { GripVertical } from "lucide-react";
import Image from "next/image";
import { FileWithPreview} from "@/hooks/use-file-upload";

export default function SortableShotItem({ item }: { item: FileWithPreview }) {
  const { file, id, preview } = item;
  const {
    // attributes,
    // listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className=" rounded-lg flex justify-between w-full" ref={setNodeRef} style={style} >
      <div className="w-full">
        {/* {file.type && (<p>{file.type}</p>)} */}
        {file.type.startsWith('image') && <Image src={preview? preview: "/placeholder.svg"} alt={file.name} width={500} height={500} quality={100} className="w-full" />}
        {file.type.startsWith('video') && <video src={preview? preview : file.name}  className="w-full h-auto"  autoPlay={true} loop={true} muted={true}/>}
        {/* {file.type === 'text' && <p>{file.name}</p>} */}
        {/* <p className="text-2xl font-bold text-black">dd</p> */}
        {/* <button {...attributes} {...listeners} className="absolute top-2 right-12 cursor-move hover:bg-primary hover:text-accent p-2 rounded-full"><GripVertical size={16}/></button> */}
      </div>
      
    </div>
  );
}