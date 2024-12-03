import { IItemEntry } from './IItemEntry';

export type ShieldCellEntry = IItemEntry & {
  addCapacity: number;
  addRechargeRate: number;
  addPassiveRechargeRate: number;
  addAbsorbance: number;
}
