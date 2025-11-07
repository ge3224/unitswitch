import { Unit } from "@/lib/units.ts";

export interface ViewInputState<T> {
  get(): T;
  subscribe(callback: (value: T) => void): void;
}

export type UserSubmissionCallback = (value: number, unit: Unit) => void;
