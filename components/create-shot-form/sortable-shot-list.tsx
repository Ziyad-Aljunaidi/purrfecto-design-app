"use client";

import { useState, useEffect } from "react";
import SortableShotItem from "@/components/create-shot-form/sortable-shot-item";
import { ShotItem } from "@/lib/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { ChevronUp, ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function SortableShotList({
  ShotItems,
}: {
  ShotItems: ShotItem[];
}) {
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
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items}>
          {items.map((item, index) => (
            <div key={item.id} className="flex items-center relative">
              <SortableShotItem item={item} />
              {index === 0 ? null : (
                <button
                  onClick={() => moveItemUp(index)}
                  className="ml-2 p-2 bg-primary shadow-md rounded-md text-white absolute top-4 right-4"
                >
                  <ChevronUp
                    size={24}
                    className="text-secondary mb-0.5"
                    strokeWidth={3}
                  />
                </button>
              )}

              {index === items.length - 1 ? null : (
                <button
                  onClick={() => moveItemDown(index)}
                  className={`ml-2 p-2 bg-primary shadow-md rounded-md text-white absolute ${clsx(index === 0 ? "top-4" : "top-16")} right-4`}
                >
                  <ChevronDown
                    size={24}
                    className="text-secondary mt-0.5"
                    strokeWidth={3}
                  />
                </button>
              )}
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
