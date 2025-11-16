import type { ThemePreference } from "@/lib/config.ts";

/**
 * Manages theme switching and applies the dark class to the HTML element
 */
export class ThemeManager {
  private mediaQuery: MediaQueryList;

  constructor() {
    this.mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");
  }

  /**
   * Apply theme based on user preference
   */
  applyTheme(preference: ThemePreference): void {
    const isDark = this.shouldUseDarkMode(preference);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  /**
   * Determine if dark mode should be active based on preference
   */
  private shouldUseDarkMode(preference: ThemePreference): boolean {
    switch (preference) {
      case "light":
        return false;
      case "dark":
        return true;
      case "system":
        return this.mediaQuery.matches;
      default:
        return this.mediaQuery.matches;
    }
  }

  /**
   * Listen for system theme changes when using "system" preference
   */
  watchSystemTheme(preference: ThemePreference): void {
    // Remove any existing listeners
    this.mediaQuery.removeEventListener("change", this.handleSystemThemeChange);

    // Only listen to system changes if preference is "system"
    if (preference === "system") {
      this.mediaQuery.addEventListener("change", this.handleSystemThemeChange);
    }
  }

  private handleSystemThemeChange = (e: MediaQueryListEvent): void => {
    if (e.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
}

// Export a singleton instance
export const themeManager = new ThemeManager();
