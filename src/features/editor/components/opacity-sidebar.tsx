import { useMemo, useState } from "react";

import { 
  ActiveTool, 
  Editor, 
} from "@/features/editor/types";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";

import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OpacitySidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const OpacitySidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: OpacitySidebarProps) => {
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );

  const selectedOpacity = selectedObject?.get("opacity") ?? 1;

  const [localOpacity, setLocalOpacity] = useState<number | null>(null);

  const opacity = localOpacity ?? selectedOpacity;

  const onClose = () => {
    onChangeActiveTool("select");
    setLocalOpacity(null);
  };

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setLocalOpacity(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-40 w-90 h-full flex flex-col",
        activeTool === "opacity" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Change the opacity of the selected object"
      />
      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Slider
            value={[opacity]}
            onValueChange={(values) => onChange(values[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};