import { newSimpleState, SimpleState } from "@pkg/simple-state/src/index.ts";
import {
  CH_TO_EM_RATIO,
  EX_TO_EM_RATIO,
  FONT_SIZE,
  PPI,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@/lib/constants.ts";
import {
  validateViewportWidth,
  validateViewportHeight,
  validateFontSize,
  validatePpi,
  validateChToEmRatio,
  validateExToEmRatio,
} from "@/lib/validation.ts";

/**
 * Theme preference options
 */
export type ThemePreference = "light" | "dark" | "system";

/**
 * User-configurable settings for CSS unit conversions
 */
export type AppConfig = {
  /** Viewport width in pixels */
  viewportWidth: number;
  /** Viewport height in pixels */
  viewportHeight: number;
  /** Base font size in pixels */
  fontSize: number;
  /** Pixels per inch (screen resolution) */
  ppi: number;
  /** Character width (ch) to em ratio */
  chToEmRatio: number;
  /** X-height (ex) to em ratio */
  exToEmRatio: number;
  /** Theme preference: light, dark, or system */
  theme: ThemePreference;
};

const LOCAL_STORAGE_KEY = "unitswitch-config";

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: AppConfig = {
  viewportWidth: VIEWPORT_WIDTH,
  viewportHeight: VIEWPORT_HEIGHT,
  fontSize: FONT_SIZE,
  ppi: PPI,
  chToEmRatio: CH_TO_EM_RATIO,
  exToEmRatio: EX_TO_EM_RATIO,
  theme: "system",
};

/**
 * Load configuration from local storage
 */
function loadConfig(): AppConfig {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate all required fields exist and are correct types
      if (
        typeof parsed.viewportWidth === "number" &&
        typeof parsed.viewportHeight === "number" &&
        typeof parsed.fontSize === "number" &&
        typeof parsed.ppi === "number" &&
        typeof parsed.chToEmRatio === "number" &&
        typeof parsed.exToEmRatio === "number"
      ) {
        // Validate ranges
        const validations = [
          validateViewportWidth(parsed.viewportWidth),
          validateViewportHeight(parsed.viewportHeight),
          validateFontSize(parsed.fontSize),
          validatePpi(parsed.ppi),
          validateChToEmRatio(parsed.chToEmRatio),
          validateExToEmRatio(parsed.exToEmRatio),
        ];

        // Check if any validation failed
        const hasError = validations.some((result) => !result.ok);
        if (hasError) {
          console.warn(
            "Stored config has invalid values, using defaults:",
            validations.filter((r) => !r.ok).map((r) => r.ok ? null : r.error.message),
          );
          return { ...DEFAULT_CONFIG };
        }

        // Add theme if it's missing from stored config (backwards compatibility)
        return {
          ...parsed,
          theme: parsed.theme || "system",
        };
      }
    }
  } catch (error) {
    console.warn("Failed to load config from localStorage:", error);
  }
  return { ...DEFAULT_CONFIG };
}

/**
 * Save configuration to local storage
 */
function saveConfig(config: AppConfig): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.warn("Failed to save config to localStorage:", error);
  }
}

/**
 * Global configuration state
 */
export const configState: SimpleState<AppConfig> = newSimpleState<AppConfig>(
  loadConfig(),
);

// Subscribe to save changes to localStorage
const handleConfigSave: (newConfig: AppConfig) => void = function handleConfigSave(newConfig: AppConfig): void {
  saveConfig(newConfig);
};
configState.subscribe(handleConfigSave);

/**
 * Reset configuration to defaults
 */
export function resetConfig(): void {
  configState.set({ ...DEFAULT_CONFIG });
}
