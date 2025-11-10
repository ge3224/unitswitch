import { App } from "@/app.tsx";
import "@/styles.css";
import { themeManager } from "@/lib/theme_manager.ts";
import { configState } from "@/lib/config.ts";

// Apply initial theme based on saved preference
const config = configState.get();
themeManager.applyTheme(config.theme);
themeManager.watchSystemTheme(config.theme);

// Subscribe to config changes to update theme
configState.subscribe((newConfig) => {
  themeManager.applyTheme(newConfig.theme);
  themeManager.watchSystemTheme(newConfig.theme);
});

document.getElementById("app")?.appendChild(App());
