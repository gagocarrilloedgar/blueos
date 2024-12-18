// src/Tiptap.tsx
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import FontFamily from "@tiptap/extension-font-family";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";

import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import "./index.css";

import { Bold, Heading1, Heading2, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const EditDocument = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskItem,
      TaskList,
      Paragraph,
      Text,
      Document,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-2"
        }
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-2"
        }
      }),
      OrderedList,
      ListItem,
      TextStyle,
      FontFamily,
      Heading.configure({
        levels: [1, 2, 3, 4]
      })
    ],
    content: undefined,
    autofocus: "all"
  });

  if (!editor) return null; // Ensure editor is loaded before rendering

  return (
    <div>
      <BubbleMenu editor={editor}>
        <ToggleGroup
          type="multiple"
          className="bg-background p-1 border rounded-md"
        >
          <ToggleGroupItem
            value="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label="Toggle bold"
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="strikethrough"
            aria-label="Toggle strikethrough"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading-1"
            aria-label="Title"
            onClick={() =>
              editor.chain().focus().setHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading-2"
            aria-label="Subtitle"
            onClick={() =>
              editor.chain().focus().setHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </BubbleMenu>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        placeholder="Enter new title"
        className="px-2 editor-conent min-h-[80vh]"
        onClick={() => editor.chain().focus().run()}
      />
    </div>
  );
};

export default EditDocument;
