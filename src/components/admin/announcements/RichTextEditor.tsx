import { Bold, Italic, List, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const handleFormat = (command: string) => {
    document.execCommand(command, false);
    const content = document.querySelector('[contenteditable="true"]')?.innerHTML;
    if (content) onChange(content);
  };

  return (
    <div className="border rounded-md">
      <div className="flex gap-2 p-2 border-b bg-muted/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('bold')}
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('italic')}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('insertUnorderedList')}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleFormat('createLink')}
          className="h-8 w-8 p-0"
        >
          <Link className="h-4 w-4" />
        </Button>
      </div>
      <div
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  );
};