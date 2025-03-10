"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const Tiptap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  // useEditor is basically used to initialize the editor
  const editor = useEditor({
    extensions: [StarterKit],
    // content is the input that we got from the input
    content: description,
    // editor props is basically used to customize the style oc TipTap
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML()); // when onChange event occue whatever present in the editor convert it into HTML
    },
  });

  return (
    <div className="flex flex-col justify-stretch min-h-[250px]">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
