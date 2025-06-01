"use client"

import type React from "react"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Heading from "@tiptap/extension-heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading2,
  // Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Type,
} from "lucide-react"
import { useEffect, useState } from "react"
import { z } from "zod"
import { useShotErrors } from "@/hooks/use-errors"

const contentSchema = z
  .string()
  .min(80, "Content must be at least 80 characters long")
  .max(400, "Content must not exceed 400 characters")

interface RichTextEditorProps {
  initialContent?: string
  onChange?: (jsonContent: string, isValid: boolean) => void
  className?: string
}

export default function RichTextEditor({ initialContent = "", onChange, className }: RichTextEditorProps) {
  const [validationError, setValidationError] = useState<string | null>(null)
  const [characterCount, setCharacterCount] = useState(0)
  const {setError, clearError} = useShotErrors();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // We'll use our custom heading extension
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        HTMLAttributes: { class: "text-3xl",  },
        levels: [2],
      }),
    ],
    immediatelyRender: false,
    content: initialContent,
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      const json = editor.getJSON()
      setCharacterCount(text.length)

      try {
        contentSchema.parse(text)
        setValidationError(null)
        clearError("description")
        onChange?.(JSON.stringify(json), true)
      } catch (error) {
        if (error instanceof z.ZodError) {
          setValidationError(error.errors[0].message)
          setError("description", error.errors[0].message)
        } else {
          onChange?.(JSON.stringify(json), false)
        }
      }
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4",
      },
    },
  })

  useEffect(() => {
    if (editor && initialContent) {
      const text = editor.getText()
      setCharacterCount(text.length)

      try {
        contentSchema.parse(text)
        setValidationError(null)
      } catch (error) {
        if (error instanceof z.ZodError) {
          setValidationError(error.errors[0].message)
        }
      }
    }
  }, [editor, initialContent])

  if (!editor) {
    return null
  }

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void
    isActive?: boolean
    children: React.ReactNode
    title: string
  }) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="icon"
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      title={title}
      className={cn("h-8 w-8 p-0", isActive && "bg-primary text-primary-foreground", "hover:bg-lime-400/5 hover:ring-2 hover:ring-lime-400 hover:text-primary")}
    >
      {children}
    </Button>
  )

  return (
    <>
    <h2 className="text-lg sm:text-xl font-bold text-foreground w-full">About This Shot</h2>
    <div className={cn("border-2 rounded-xl overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="border-b-2 p-1.5 sticky top-0 z-10">
        <div className="flex items-center gap-0.5 flex-wrap">
          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Headings */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>

          {/* <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton> */}

          <ToolbarButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive("paragraph")}
            title="Paragraph"
          >
            <Type className="h-4 w-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Text Alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            isActive={editor.isActive({ textAlign: "justify" })}
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </ToolbarButton>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
        </div>
      </div>

      {/* Editor Content */}
      <div className="min-h-[200px]">
        <EditorContent editor={editor} />
      </div>

      {/* Footer with validation and character count */}
      <div className="border-t bg-muted/30 px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          {validationError && <span className="text-rose-500">{validationError}</span>}
          {!validationError && characterCount >= 80 && <span className="text-green-600">Content is valid</span>}
        </div>
        <div
          className={cn(
            "text-muted-foreground",
            characterCount > 400 && "text-rose-500",
            characterCount < 80 && "text-primary",
          )}
        >
          {characterCount}/400 characters
        </div>
      </div>
    </div>
    </>
  )
}
