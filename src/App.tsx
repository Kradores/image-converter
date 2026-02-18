import { ImageUploader } from "@/features/conversion/components/ImageUploader";
import { ConversionSettings } from "@/features/conversion/components/ConversionSettings";
import { ConvertButton } from "@/features/conversion/components/ConvertButton";
import { ProgressOverlay } from "@/features/conversion/components/ProgressOverlay";
import { ErrorAlert } from "@/features/conversion/components/ErrorAlert";
import { useState } from "react";

function App() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Image Converter</h1>

      <ImageUploader files={files} setFiles={setFiles} />
      <ConversionSettings />
      <div className="mt-6">
        <ConvertButton files={files} />
      </div>

      <ProgressOverlay />
      <ErrorAlert />
    </div>
  );
}

export default App;
