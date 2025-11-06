import type { Unit } from "@/lib/units.ts";

export type Converter = (from: Unit, input: number) => number;
