import { IItemEntry } from "./IItemEntry";

export type LaserEntry = IItemEntry & {
  baseDamage: number;
  criticalChance: number;
  laserAmpSlots: number;
}
