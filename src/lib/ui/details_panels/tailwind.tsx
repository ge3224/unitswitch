import { converttoTailwind } from "@/lib/converters/tailwind.ts";
import { Unit } from "@/lib/units.ts";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { newSimpleState, SimpleState } from "@pkg/simple-state/src/index.ts";

export default function DetailsTailwind(
  { input, from }: { input: SimpleState<number>; from: SimpleState<Unit> },
) {
  const _conversion = newSimpleState<number>(
    converttoTailwind(from.get(), input.get()),
  );

  input.subscribe(function (newValue): void {
    _conversion.set(converttoTailwind(from.get(), newValue));
  });

  from.subscribe(function (newValue): void {
    _conversion.set(converttoTailwind(newValue, input.get()));
  });

  const conversionValue = _conversion.get();
  const exampleText = document.createTextNode(
    conversionValue >= 0 ? `"p-${conversionValue}"` : "N/A",
  );

  _conversion.subscribe(function (newValue): void {
    exampleText.textContent = newValue >= 0 ? `"p-${newValue}"` : "N/A";
  });

  return (
    <div class="text-app-black">
      <strong>Example</strong>: {conversionValue >= 0
        ? (
          <code class="font-mono ">
            <span class="text-app-gray-200">{`"class"="`}</span>
            <span class="text-app-green-500">{`${exampleText}"`}</span>
          </code>
        )
        : exampleText}
    </div>
  );
}
