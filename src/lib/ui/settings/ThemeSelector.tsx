import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import type { Ref } from "@pkg/just-jsx/src/index.ts";
import { UI } from "@/lib/strings/index.ts";

type ThemeSelectorProps = {
  themeRefs: {
    light: Ref<HTMLInputElement>;
    dark: Ref<HTMLInputElement>;
    system: Ref<HTMLInputElement>;
  };
};

export default function ThemeSelector({ themeRefs }: ThemeSelectorProps) {
  return (
    <div class="space-y-3">
      <h3 class="text-sm font-semibold text-app-green-400">
        {UI.sections.theme}
      </h3>
      <div class="flex gap-2">
        <label class="flex-1 cursor-pointer">
          <input
            ref={themeRefs.light}
            type="radio"
            name="theme"
            value="light"
            class="peer sr-only"
          />
          <div class="rounded-sm border border-app-green-600/50 bg-transparent px-3 py-2 text-center text-sm text-app-gray-200 transition-all peer-checked:border-app-green-400 dark:peer-checked:border-app-green-400 peer-checked:bg-app-green-300 dark:peer-checked:bg-app-green-600 peer-checked:text-app-black dark:peer-checked:text-white peer-checked:font-medium hover:bg-app-green-700 hover:text-white">
            {UI.theme.light}
          </div>
        </label>
        <label class="flex-1 cursor-pointer">
          <input
            ref={themeRefs.dark}
            type="radio"
            name="theme"
            value="dark"
            class="peer sr-only"
          />
          <div class="rounded-sm border border-app-green-600/50 bg-transparent px-3 py-2 text-center text-sm text-app-gray-200 transition-all peer-checked:border-app-green-400 dark:peer-checked:border-app-green-400 peer-checked:bg-app-green-300 dark:peer-checked:bg-app-green-600 peer-checked:text-app-black dark:peer-checked:text-white peer-checked:font-medium hover:bg-app-green-700 hover:text-white">
            {UI.theme.dark}
          </div>
        </label>
        <label class="flex-1 cursor-pointer">
          <input
            ref={themeRefs.system}
            type="radio"
            name="theme"
            value="system"
            class="peer sr-only"
          />
          <div class="rounded-sm border border-app-green-600/50 bg-transparent px-3 py-2 text-center text-sm text-app-gray-200 transition-all peer-checked:border-app-green-400 dark:peer-checked:border-app-green-400 peer-checked:bg-app-green-300 dark:peer-checked:bg-app-green-600 peer-checked:text-app-black dark:peer-checked:text-white peer-checked:font-medium hover:bg-app-green-700 hover:text-white">
            {UI.theme.system}
          </div>
        </label>
      </div>
    </div>
  );
}
