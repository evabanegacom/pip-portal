import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import toast from "react-hot-toast"
import type { ToastOptions } from "react-hot-toast"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const defaultOptions: ToastOptions = {
  duration: 4000,
  style: {
    borderRadius: "12px",
    padding: "12px 20px",
    fontWeight: 500,
    fontSize: "14px",
    color: "#fff",
  },
}

export const toastSuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, {
    ...defaultOptions,
    style: {
      ...defaultOptions.style,
      background: "linear-gradient(90deg, #4ade80, #16a34a)", // green gradient
      ...options?.style,
    },
    ...options,
  })

export const toastError = (message: string, options?: ToastOptions) =>
  toast.error(message, {
    ...defaultOptions,
    style: {
      ...defaultOptions.style,
      background: "linear-gradient(90deg, #f87171, #b91c1c)", // red gradient
      ...options?.style,
    },
    ...options,
  })
