import { toast } from "react-toastify";
import type { ApiError } from "./handleApiError";

export function notifyApiError(error: ApiError) {
  toast.error(error.message);
}
