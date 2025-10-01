import type { Unit } from "@/lib/units";

export type Converter = (from: Unit, input: number) => number;
