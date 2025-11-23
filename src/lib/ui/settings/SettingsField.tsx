import { createDomElement, createRef } from "@pkg/just-jsx/src/index.ts";
import type { Ref } from "@pkg/just-jsx/src/index.ts";

type SettingsFieldProps = {
  id: string;
  label: string;
  type?: "number" | "text";
  min?: string;
  max?: string;
  step?: string;
  placeholder?: string;
  inputRef?: Ref<HTMLInputElement>;
};

export default function SettingsField({
  id,
  label,
  type = "number",
  min,
  max,
  step,
  placeholder,
  inputRef,
}: SettingsFieldProps) {
  const ref = inputRef || createRef<HTMLInputElement>();

  return (
    <div>
      <label htmlFor={id} class="block text-xs text-app-gray-200 mb-1">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        type={type}
        min={min}
        max={max}
        step={step}
        class="w-full rounded-sm border border-transparent dark:border-app-green-700 bg-app-gray-100 dark:bg-app-gray-800 dark:text-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-app-green-600"
        placeholder={placeholder}
      />
    </div>
  );
}
