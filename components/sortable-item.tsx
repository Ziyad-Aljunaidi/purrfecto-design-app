
import { Item } from "@/lib/definitions";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import { GripVertical } from "lucide-react";

export default function SortableItem({ item }: { item: Item }) {
  const { id,content } = item;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="border-input border-2 bg-white p-8 rounded-lg flex justify-between" ref={setNodeRef} style={style} >
      <div>
        <h3 className="text-lg font-bold">{content}</h3>
        {/* <p className="text-sm text-gray-600">ID: {id}</p> */}
      </div>
      <button {...attributes} {...listeners} className="cursor-move hover:bg-gray-50 p-2 rounded-full"><GripVertical size={16}/></button>
    </div>
  );
}