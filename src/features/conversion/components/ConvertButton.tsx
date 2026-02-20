import { useCallback } from "react";
import { useConvertImagesMutation } from "../conversionApi";
import { setError } from "../conversionSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hooks";
import { cn, isFetchBaseQueryError } from "@/lib/utils";
import { toast } from "sonner";

interface ConvertButtonProps {
  files: File[];
}

export function ConvertButton({ files }: ConvertButtonProps) {
  const dispatch = useAppDispatch();
  const { quality, compressionLevel, sizes, lossless } =
    useAppSelector((state) => state.conversion);

  const [convertImages, { isLoading }] = useConvertImagesMutation();

  const handleSubmit = useCallback(async () => {
    if (!files.length) {
      dispatch(setError("No files selected."));
      return;
    }

    // Build FormData
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("quality", String(quality));
    formData.append("compressionLevel", String(compressionLevel));
    formData.append("lossless", String(lossless));
    formData.append("sizes", sizes.join(","));

    dispatch(setError(null));

    try {
      await convertImages(formData).unwrap();
      toast.success("Conversion complete");
    } catch (err: unknown) {
      console.error(err);

      if (isFetchBaseQueryError(err)) {
        if (err.status === 413) {
          dispatch(setError("Payload too large. Reduce file size or count."));
        } else if (err.status === 'FETCH_ERROR') {
          dispatch(setError("Network error. Check your connection."));
        } else {
          dispatch(setError("Conversion failed."));
        }
      }
    }
  }, [files, quality, compressionLevel, lossless, sizes, convertImages, dispatch]);

  const disabled = isLoading || !files.length || !sizes.length;

  return (
    <button
      onClick={handleSubmit}
      disabled={disabled}
      className={cn("px-6 py-3 rounded font-semibold text-white transition",
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      )}
    >
      {isLoading ? "Processing..." : "Convert Images"}
    </button>
  );
}
