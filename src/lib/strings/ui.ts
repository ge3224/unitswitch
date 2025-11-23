/**
 * UI labels, buttons, headings, and form fields
 */
export const UI = {
  buttons: {
    convert: "Convert",
    save: "Save",
    cancel: "Cancel",
    resetToDefaults: "Reset to Defaults",
    clear: "Clear",
  },
  sections: {
    settings: "Settings",
    viewport: "Viewport",
    font: "Font",
    display: "Display",
    theme: "Theme",
  },
  labels: {
    amount: "Amount:",
    unit: "Unit:",
  },
  settings: {
    subtitle: "Configure CSS unit conversion parameters",
    viewport: {
      width: "Width (px)",
      height: "Height (px)",
    },
    font: {
      baseFontSize: "Base Font Size (px)",
      chEmRatio: "ch/em Ratio",
      exEmRatio: "ex/em Ratio",
    },
    display: {
      ppi: "Pixels Per Inch (PPI)",
    },
  },
  theme: {
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  modal: {
    title: "Enter a value and unit",
    formatLabel: "Format: ",
    formatExample: "value:unit",
    placeholder: "e.g., 100:px or 2:rem",
  },
  keyboard: {
    ctrl: "Ctrl",
    k: "K",
  },
} as const;
