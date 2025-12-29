"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Digite aqui...",
  disabled = false,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Atualiza o editor quando o valor externo muda
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-gray-300 bg-gray-50">
        <p className="text-gray-500">Carregando editor...</p>
      </div>
    );
  }

  const addLink = () => {
    const url = window.prompt("URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("URL da imagem:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="rich-text-editor rounded-lg border border-gray-300">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border-b border-gray-300 bg-gray-50 p-2">
        {/* Headers */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`rounded px-3 py-1 text-sm font-semibold transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`rounded px-3 py-1 text-sm font-semibold transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`rounded px-3 py-1 text-sm font-semibold transition-colors ${
            editor.isActive("heading", { level: 3 })
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          H3
        </button>

        <div className="mx-1 w-px bg-gray-300"></div>

        {/* Text styles */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded px-3 py-1 text-sm font-bold transition-colors ${
            editor.isActive("bold")
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded px-3 py-1 text-sm italic transition-colors ${
            editor.isActive("italic")
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`rounded px-3 py-1 text-sm underline transition-colors ${
            editor.isActive("underline")
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`rounded px-3 py-1 text-sm line-through transition-colors ${
            editor.isActive("strike")
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          S
        </button>

        <div className="mx-1 w-px bg-gray-300"></div>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded px-3 py-1 text-sm transition-colors ${
            editor.isActive("bulletList")
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          • Lista
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded px-3 py-1 text-sm transition-colors ${
            editor.isActive("orderedList")
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          1. Lista
        </button>

        <div className="mx-1 w-px bg-gray-300"></div>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`rounded px-3 py-1 text-sm transition-colors ${
            editor.isActive({ textAlign: "left" })
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          ⬅
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`rounded px-3 py-1 text-sm transition-colors ${
            editor.isActive({ textAlign: "center" })
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          ↔
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`rounded px-3 py-1 text-sm transition-colors ${
            editor.isActive({ textAlign: "right" })
              ? "bg-[#2c4f6f] text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          type="button"
        >
          ➡
        </button>

        <div className="mx-1 w-px bg-gray-300"></div>

        {/* Link & Image */}
        <button
          onClick={addLink}
          className="rounded bg-white px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
          type="button"
        >
          🔗 Link
        </button>
        <button
          onClick={addImage}
          className="rounded bg-white px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
          type="button"
        >
          🖼️ Imagem
        </button>

        <div className="mx-1 w-px bg-gray-300"></div>

        {/* Clear */}
        <button
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="rounded bg-white px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
          type="button"
        >
          🧹 Limpar
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4"
        style={{ minHeight: "300px" }}
      />

      <style jsx global>{`
        .ProseMirror {
          min-height: 300px;
          outline: none;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: "${placeholder}";
          color: #9ca3af;
          float: left;
          height: 0;
          pointer-events: none;
        }

        .ProseMirror img {
          max-width: 100%;
          height: auto;
        }

        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .ProseMirror h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.5em 0;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.5em;
        }

        .ProseMirror ul {
          list-style-type: disc;
        }

        .ProseMirror ol {
          list-style-type: decimal;
        }
      `}</style>
    </div>
  );
}
