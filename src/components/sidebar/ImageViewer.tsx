import { Image } from "lucide-react";

interface ImageViewerProps {
  imageUrl?: string;
  // Add other relevant image props
}

export default function ImageViewer({
  imageUrl = "https://placehold.co/600x400/000000/FFFFFF/png?text=Placeholder+Image",
}: ImageViewerProps) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <div className="p-4">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <Image className="w-5 h-5 text-pink" />
        Image Viewer
      </h3>
      <div className="aspect-video bg-muted rounded overflow-hidden">
        <img
          src={imageUrl}
          alt="X-Ray or Scan"
          className="w-full h-full object-cover"
        />
      </div>
      {/* TODO: Add zoom/pan controls? */}
    </div>
  );
}
