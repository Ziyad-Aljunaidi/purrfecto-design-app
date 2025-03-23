"use client";

import {  useState } from "react";
import SortableItem from "./sortable-item";
import { Item } from "@/lib/definitions";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const dummyItems: Item[] = [
  { id: 1, content: "Item 1" },
  { id: 2, content: "Item 2" },
  { id: 3, content: "Item 3" },
  { id: 4, content: "Item 4" },

  { id: 5, content: "Item 5" },
  { id: 6, content: "Item 6" },
  { id: 7, content: "Item 7" },
  { id: 8, content: "Item 8" },
  { id: 9, content: "Item 9" }, 
  { id: 10, content: "Item 10" }, 
];

export default function SortableList() {
  const [items, setItems] = useState<Item[]>(dummyItems);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // console.log("active", active);
    // console.log("over", over);
    if(over && active.id !== over.id){
      setItems((items) => {
        const prevIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, prevIndex, newIndex);
      });
      
    }
    // console.log(JSON.stringify(items));
  };

  
  return (
    <div className="max-w-2xl mx-auto grid gap-2 my-10 font-[family-name:var(--font-jetbrains-mono)]">
      <h2 className="text-2xl font-bold mb-4">List of Sortable Items</h2>
      <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={items}>
          {items.map((item) => (
            <div key={item.id}>
              <SortableItem item={item} />
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}


