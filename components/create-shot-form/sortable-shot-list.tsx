"use client";

import { useState, useEffect } from "react";
import SortableShotItem from "@/components/create-shot-form/sortable-shot-item";
import { ShotItem } from "@/lib/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function SortableShotList({ ShotItems }: { ShotItems: ShotItem[] }) {
  const [items, setItems] = useState<ShotItem[]>(ShotItems);

  useEffect(() => {
    setItems(ShotItems);
  }, [ShotItems]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const prevIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, prevIndex, newIndex);
      });
    }
    console.log(JSON.stringify(items));
  };

  const moveItemUp = (index: number) => {
    if (index > 0) {
      setItems((items) => arrayMove(items, index, index - 1));
    }
  };

  const moveItemDown = (index: number) => {
    if (index < items.length - 1) {
      setItems((items) => arrayMove(items, index, index + 1));
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid gap-4 my-10 font-[family-name:var(--font-jetbrains-mono)]">
      {/* <h2 className="text-2xl font-bold mb-4">List of Sortable Items</h2> */}
      <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={items}>
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center relative">
              <SortableShotItem item={item} />
              <button onClick={() => moveItemUp(index)} className="ml-2 p-1 bg-lime-400 rounded-full text-white absolute top-2 right-2">
                <ArrowUp size={16} stroke="black" strokeWidth={3} />
              </button>
              <button onClick={() => moveItemDown(index)} className="ml-2 p-1 bg-lime-400 rounded-full text-white absolute top-10 right-2">
              <ArrowDown size={16} stroke="black" strokeWidth={3} />
              </button>
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
