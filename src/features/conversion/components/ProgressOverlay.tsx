import { Spinner } from "@/components/ui/spinner";
import { useAppSelector } from "@/hooks/use-redux-hooks";

export function ProgressOverlay() {
  const { isProcessing } = useAppSelector((state) => state.conversion);;

  if (!isProcessing) return <></>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg px-8 py-6 flex flex-col items-center gap-4">
        <Spinner />
        <p className="text-lg font-medium">Processing images...</p>
      </div>
    </div>
  );
}
