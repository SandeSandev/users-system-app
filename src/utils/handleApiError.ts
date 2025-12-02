import axios from "axios";

export interface ApiError {
  message: string;
  status?: number;
}

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message ||
        error.response?.statusText ||
        "API error",
      status: error.response?.status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unknown error occurred",
  };
}
