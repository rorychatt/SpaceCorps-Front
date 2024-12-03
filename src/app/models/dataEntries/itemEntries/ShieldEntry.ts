import { IItemEntry } from './IItemEntry';

export type ShieldEntry = IItemEntry & {
  capacity: number;
  rechargeRate: number;
  passiveRechargeRate: number;
  absorbance: number;
  shieldCellSlots: number;
}
