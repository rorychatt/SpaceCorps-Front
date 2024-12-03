import { IItemEntry } from "./IItemEntry";

export type LaserAmpEntry = IItemEntry & {
  addBaseDamage: number;
  addLaserDamageMultiplier: number;
  addCriticalChance: number;
}
