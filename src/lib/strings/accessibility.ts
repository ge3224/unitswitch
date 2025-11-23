/**
 * Accessibility strings (aria-label, title attributes, etc.)
 */
export const A11Y = {
  buttons: {
    openSettings: "Open settings (Ctrl+/)",
    closePanel: "Close panel",
    closeModal: "Close modal",
    showDetails: "Show details",
    copyToClipboard: "Copy converted value to clipboard",
    clearInput: "Clear input",
  },
  titles: {
    settings: "Settings (Ctrl+/)",
    copyValue: "Click to copy the converted value to the clipboard",
    quickKeyboard: "Press Ctrl+K for quick keyboard conversions",
    clear: "Clear",
    remExplanation:
      "rem is relative to the root element's font size, while em is relative to the parent element's font size",
    remExplanationButton: "Click for explanation of root font size",
  },
  inputs: {
    amount: "Amount",
    unit: "Unit",
  },
  icons: {
    arrowUp: "Arrow up",
    arrowDown: "Arrow down",
    enterKey: "Enter key",
    escapeKey: "Escape key",
  },
} as const;
