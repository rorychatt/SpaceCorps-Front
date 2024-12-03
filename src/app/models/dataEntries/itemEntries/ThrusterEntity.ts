import { IItemEntry } from "./IItemEntry";

export type ThrusterEntity = IItemEntry & {
  addBaseSpeed: number;
  baseSpeedMultiplier: number;
};
