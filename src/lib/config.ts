import { newSimpleState, SimpleState } from "@pkg/simple-state/src/index.ts";
import {
  CH_TO_EM_RATIO,
  EX_TO_EM_RATIO,
  FONT_SIZE,
  PPI,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@/lib/constants.ts";

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
};

/**
 * Load configuration from local storage
 */
function loadConfig(): AppConfig {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate all required fields exist
      if (
        typeof parsed.viewportWidth === "number" &&
        typeof parsed.viewportHeight === "number" &&
        typeof parsed.fontSize === "number" &&
        typeof parsed.ppi === "number" &&
        typeof parsed.chToEmRatio === "number" &&
        typeof parsed.exToEmRatio === "number"
      ) {
        return parsed;
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
configState.subscribe((newConfig: AppConfig) => {
  saveConfig(newConfig);
});

/**
 * Reset configuration to defaults
 */
export function resetConfig(): void {
  configState.set({ ...DEFAULT_CONFIG });
}
