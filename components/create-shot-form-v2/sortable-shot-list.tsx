import SortableShotItem from "@/components/create-shot-form-v2/sortable-shot-item";
// import { ShotItem } from "@/lib/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { ChevronUp, ChevronDown, SparklesIcon } from "lucide-react";
import { FileWithPreview} from "@/hooks/use-file-upload";
import clsx from "clsx";
import {Button} from "@/components/ui/button";


export default function SortableShotList({
  heading,
  ShotItems,
  ShotItemsSetter,
}: {
  heading?: string;
  ShotItems: FileWithPreview[];
  ShotItemsSetter: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
}) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      ShotItemsSetter((items) => {
        const prevIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, prevIndex, newIndex);
      });
    }
    // console.log(JSON.stringify(items));
  };

  const moveItemUp = (index: number) => {
    if (index > 0) {
      ShotItemsSetter((items) => arrayMove(items, index, index - 1));
    }
    // console.log("items: ", ShotItems);
  };

  const moveItemDown = (index: number) => {
    if (index < ShotItems.length - 1) {
      ShotItemsSetter((items) => arrayMove(items, index, index + 1));
    }
    // console.log("items: ", ShotItems);
  };

  return (
    <>
    {heading && (<h2 className="flex items-center gap-2 text-xl font-bold text w-full"><span><SparklesIcon/></span>{heading}</h2>)}
    <div className="max-w-5xl mx-auto grid gap-4 my-10">
      
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={ShotItems}>
          {ShotItems.map((item, index) => (
            <div key={item.id} className="flex items-center relative">
              <SortableShotItem item={item} />
              {index === 0 ? null : (
                <Button
                  variant={"ghost"}
                  onClick={() => moveItemUp(index)}
                  className="absolute top-4 right-4 "
                >
                  <ChevronUp
                    // size={24}
                    className="size-8"
                    // strokeWidth={3}
                  />
                </Button>
              )}

              {index === ShotItems.length - 1 ? null : (
                <Button
                  onClick={() => moveItemDown(index)}
                  variant={"ghost"}
                  className={`absolute ${clsx(
                    index === 0 ? "top-4" : "top-16"
                  )} right-4`}
                >
                  <ChevronDown
                    // size={24}
                    className="size-8"
                    // strokeWidth={3}
                  />
                </Button>
              )}
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
    </>
  );
}
