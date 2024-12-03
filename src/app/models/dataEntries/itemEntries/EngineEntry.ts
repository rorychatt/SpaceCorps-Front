import { IItemEntry } from './IItemEntry';

export type EngineEntry = IItemEntry & {
  baseSpeed: number;
  thrusterSlots: number;
}
