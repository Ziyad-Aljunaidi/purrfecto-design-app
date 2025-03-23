"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,

  Heading2,

  AlignCenter,
  AlignLeft,
  AlignRight,

} from "lucide-react";
import { Toggle } from "./ui/toggle";

type Props = {
  editor: Editor | null;
};

export default function Toolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <div className="border-2 border-input bg-transparent rounded-xl p-1 my-2 space-x-0.5">
      <Toggle
        size="sm"
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4"/>
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() =>
          editor.chain().focus().toggleBold().run()
        }
      >
        <Bold className="h-4 w-4"/>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() =>
          editor.chain().focus().toggleItalic().run()
        }
      >
        <Italic className="h-4 w-4"/>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() =>
          editor.chain().focus().toggleStrike().run()
        }
      >
        <Strikethrough className="h-4 w-4"/>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <List className="h-4 w-4"/>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() =>
          editor.chain().focus().toggleOrderedList().run()
        }
      >
        <ListOrdered className="h-4 w-4"/>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("AlignLeft")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <AlignLeft className="h-4 w-4"/>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("AlignCenter")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <AlignCenter className="h-4 w-4"/>
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("AlignRight")}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <AlignRight className="h-4 w-4"/>
      </Toggle>

    </div>
  );
}
