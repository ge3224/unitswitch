/**
 * Toast and notification messages
 */
export const NOTIFICATIONS = {
  success: {
    copied: "Copied!",
  },
  error: {
    copyFailed: "Failed to copy to clipboard",
    cannotCopyUnavailable: (errorMessage: string) =>
      `Cannot copy unavailable conversion: ${errorMessage}`,
  },
  config: {
    loadFailed: "Settings couldn't be loaded, using defaults",
    saveFailed: "Failed to save settings",
  },
} as const;
