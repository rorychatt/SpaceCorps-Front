import { IItemEntry } from './IItemEntry';

export type ShipEntry = IItemEntry & {
  baseHealth: number;
  baseSpeed: number;
  engineSlots: number;
  shieldSlots: number;
  laserSlots: number;
}
