import { toast } from "sonner";
import { setError } from "../conversionSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-hooks";

export function ErrorAlert() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.conversion.error);

  if (error) {
    toast.error(error);
    dispatch(setError(null));
  }

  return <></>;
}
