import { createDomElement } from "@pkg/just-jsx/src/index.ts";

/**
 * Toast notification system for user feedback
 * Zero dependencies - uses vanilla DOM APIs and Tailwind CSS
 */

type ToastType = "error" | "success" | "info";

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

const TOAST_DURATION_MS = 3000;
const TOAST_SUCCESS_DURATION_MS = 1500;
const TOAST_FADE_OUT_MS = 300;

/**
 * Shows a toast notification to the user
 */
export function showToast(options: ToastOptions): void {
  const { message, type = "info", duration = TOAST_DURATION_MS } = options;

  const container = getOrCreateToastContainer();

  const typeStyles = {
    error: "bg-red-500 border-red-700 text-white",
    success: "bg-app-green-600 dark:bg-app-green-700 border-app-green-700 dark:border-app-green-600 text-white",
    info: "bg-blue-500 border-blue-700 text-white",
  };

  const toast = (
    <div
      class={`${
        typeStyles[type]
      } px-4 py-3 rounded-lg shadow-lg border-2 mb-2 transition-opacity duration-300`}
      role="alert"
      style="opacity: 1"
    >
      <p class="text-sm font-medium">{message}</p>
    </div>
  ) as HTMLElement;

  container.appendChild(toast);

  // Fade out and remove after duration
  const fadeOutToast: () => void = function fadeOutToast(): void {
    toast.style.opacity = "0";

    const removeToast: () => void = function removeToast(): void {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    };
    setTimeout(removeToast, TOAST_FADE_OUT_MS);
  };
  setTimeout(fadeOutToast, duration);
}

/**
 * Get or create the toast container element
 */
function getOrCreateToastContainer(): HTMLElement {
  const existingContainer = document.getElementById("toast-container");
  if (existingContainer) {
    return existingContainer;
  }

  const container = (
    <div
      id="toast-container"
      class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    />
  ) as HTMLElement;

  // Make toasts clickable but not the container
  container.style.pointerEvents = "none";
  const style = document.createElement("style");
  style.textContent = `
    #toast-container > * {
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(container);
  return container;
}

/**
 * Convenience functions for common toast types
 */
const toastError: (message: string, duration?: number) => void = function toastError(message: string, duration?: number): void {
  showToast({ message, type: "error", duration });
};

const toastSuccess: (message: string, duration?: number) => void = function toastSuccess(message: string, duration = TOAST_SUCCESS_DURATION_MS): void {
  showToast({ message, type: "success", duration });
};

const toastInfo: (message: string, duration?: number) => void = function toastInfo(message: string, duration?: number): void {
  showToast({ message, type: "info", duration });
};

export const toast = {
  error: toastError,
  success: toastSuccess,
  info: toastInfo,
};
