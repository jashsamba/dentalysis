import { UploadCloud } from "lucide-react";

export default function UploadZone() {
  return (
    <div className="p-4 h-full flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/50 rounded-lg m-4">
      <UploadCloud className="w-10 h-10 text-muted-foreground mb-4" />
      <h3 className="font-semibold mb-2">File Upload</h3>
      <p className="text-sm text-muted-foreground text-center">
        Drag & drop files here or click to browse.
      </p>
      {/* TODO: Add actual file input and upload logic */}
    </div>
  );
}
