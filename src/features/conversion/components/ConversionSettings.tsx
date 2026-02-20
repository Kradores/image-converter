import { useCallback } from "react";
import {
  setQuality,
  setCompressionLevel,
  setLossless,
  setSizes,
  setError,
} from "../conversionSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hooks";

export function ConversionSettings() {
  const dispatch = useAppDispatch();
  const { quality, compressionLevel, lossless } =
    useAppSelector((state) => state.conversion);

  const handleSizesBlur = useCallback((sizesInput: string) => {
    if (!sizesInput.trim()) {
      dispatch(setSizes([]));
      return;
    }

    const parsed = sizesInput
      .split(",")
      .map((s) => s.trim())
      .map(Number);

    if (parsed.some((n) => isNaN(n) || n <= 0)) {
      dispatch(setError("Sizes must be positive numbers separated by commas."));
      return;
    }

    dispatch(setSizes(parsed));
  }, [dispatch]);

  return (
    <div className="space-y-6 mt-6">
      <div>
        <label className="block mb-1 font-medium">Quality: {quality}</label>
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => dispatch(setQuality(Number(e.target.value)))}
          className="w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">
          Compression Level: {compressionLevel}
        </label>
        <input
          type="range"
          min={1}
          max={6}
          value={compressionLevel}
          onChange={(e) => dispatch(setCompressionLevel(Number(e.target.value)))}
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="lossless"
          checked={lossless}
          onChange={(e) => dispatch(setLossless(e.target.checked))}
          className="h-5 w-5"
        />
        <label htmlFor="lossless" className="font-medium">
          Lossless
        </label>
      </div>

      <div>
        <label className="block mb-1 font-medium">Sizes (px, comma-separated)</label>
        <input
          type="text"
          onBlur={(e) => handleSizesBlur(e.target.value)}
          placeholder="e.g. 800,1024,1920"
          className="w-full border rounded p-2"
        />
      </div>
    </div>
  );
}
