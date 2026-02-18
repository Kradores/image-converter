import { useEffect, useMemo, useState } from "react";
import { setError } from "../conversionSlice";
import { useAppDispatch } from "@/hooks/use-redux-hooks";
import { cn } from "@/lib/utils";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/dropzone";

interface ImageUploaderProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

export function ImageUploader({ files, setFiles }: ImageUploaderProps) {
  const dispatch = useAppDispatch();

  const [isDragging, setIsDragging] = useState(false);
  const previewUrls = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  return (
    <div>
      <Dropzone
        src={files}
        onDrop={(acceptedFiles) => {
          setFiles(acceptedFiles);
        }}
        onDragOver={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onError={(err) => dispatch(setError(err.message))}
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".bmp", ".webp"] }}
        maxFiles={import.meta.env.VITE_MAX_FILES}
        maxSize={import.meta.env.VITE_MAX_FILE_SIZE_MB * 1024 * 1024}
        className={cn("border-2 border-dashed p-8 text-center rounded-lg cursor-pointer transition", isDragging ? "border-blue-500 bg-blue-50" : "border-gray-400")}
        multiple
      >
        <DropzoneContent />
        <DropzoneEmptyState />
      </Dropzone>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-6">
          {previewUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="preview"
              className="h-32 w-full object-cover rounded"
            />
          ))}
        </div>
      )}
    </div>
  );
}
