// FUTURE FEATURE UNDER DEVELOPMENT
// This component is a WYSIWYG editor using Tiptap.
'use client';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: { class: "text-4xl" },
        levels: [2],
      }),
      ListItem,
      BulletList.configure({
        HTMLAttributes: { class: "list-disc ml-4" },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-6",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
      
    ],
    content: description,
    immediatelyRender: false,
    enableContentCheck:true,
    
    editorProps: {
      attributes: {
        class: "rounded-xl border-2 min-h-[200px] p-4 border-input bg-transparent",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getText());
      console.log(editor.getText());
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px] w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
