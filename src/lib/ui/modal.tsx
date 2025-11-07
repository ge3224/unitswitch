import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { Unit } from "@/lib/units.ts";
import { UserSubmissionCallback } from "@/lib/types.ts";

export default function Modal({
  type,
  callback,
  hotkey,
}: {
  type: Unit;
  callback: UserSubmissionCallback;
  hotkey: string;
}) {
  return <div>todo</div>;
}
