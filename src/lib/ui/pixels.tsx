import { createDomElement } from "@pkg/just-jsx";
import { Unit } from "../units";
import { convertToPixels } from "../converters/pixels";

export default function Pixels({
  input, from, hotkey
}: {
  input: number; from: Unit; hotkey: string
}) {
  const _conversion = convertToPixels(from, input);
  console.log(_conversion, hotkey);

  return (
    <div class="flex items-center border-b border-app-green-600 lg:h-12 lg:items-stretch lg:border">
      <div class="mx-2 lg:my-auto lg:hidden">
      </div>
    </div>
  );
}
