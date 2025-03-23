
import { ShotItem} from "@/lib/types";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
// import { GripVertical } from "lucide-react";
import Image from "next/image";

export default function SortableShotItem({ item }: { item: ShotItem }) {
  const { id, type, content } = item;
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
        {type === 'image' && <Image src={content.preview} alt={content.name} width={500} height={500} className="rounded-xl w-full" />}
        {type === 'video' && <video src={content.preview}  className="rounded-xl w-full h-auto"  autoPlay={true} loop={true} />}
        {type === 'text' && <p>{content.name}</p>}
        {/* <p className="text-2xl font-bold text-black">dd</p> */}
        {/* <button {...attributes} {...listeners} className="absolute top-2 right-12 cursor-move hover:bg-primary hover:text-accent p-2 rounded-full"><GripVertical size={16}/></button> */}
      </div>
      
    </div>
  );
}