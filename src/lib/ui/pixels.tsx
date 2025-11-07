import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { Unit } from "@/lib/units.ts";
import { convertToPixels } from "@/lib/converters/pixels.ts";

export default function Pixels({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}) {
  const conversion = convertToPixels(from, input);
  console.log(conversion, hotkey);

  return (
    <div class="flex items-center border-b border-app-green-600 lg:h-12 lg:items-stretch lg:border">
      <div class="mx-2 lg:my-auto lg:hidden">
      </div>
    </div>
  );
}
