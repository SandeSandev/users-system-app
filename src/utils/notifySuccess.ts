import { toast } from "react-toastify";

export function notifySuccess(message: string) {
  toast.success(message);
}
