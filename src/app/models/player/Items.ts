import { InventoryItem } from "./InventoryItem";

export type SellableItems = 
  ShipItem |
  LaserItem |
  LaserAmpItem |
  ShieldItem |
  ShieldCellItem |
  EngineItem |
  ThrusterItem |
  LaserAmmoItem;

export type SellableItem = InventoryItem & {
  priceCats: number;
  priceThulium: number;
};

export type ShipItem = SellableItem & {
  baseHealth: number;
  baseSpeed: number;
  engineSlots: number;
  shieldSlots: number;
  laserSlots: number;
  itemType: 'ShipItem';
}

export type LaserItem = SellableItem & {
  baseDamage: number;
  criticalChance: number;
  laserAmpSlots: number;
  itemType: 'LaserItem';
}

export type LaserAmpItem = SellableItem & {
  addBaseDamage: number;
  addCriticalChance: number;
  addLaserDamageMultiplier: number;
  itemType: 'LaserAmpItem';
}

export type ShieldItem = SellableItem & {
  absorbance: number;
  capacity: number;
  passiveRechargeRate: number;
  rechargeRate: number;
  shieldCellSlots: number;
  itemType: 'ShieldItem';
}

export type ShieldCellItem = SellableItem & {
  addAbsorbance: number;
  addCapacity: number;
  addPassiveRechargeRate: number;
  addRechargeRate: number;
  itemType: 'ShieldCellItem';
}

export type EngineItem = SellableItem & {
  baseSpeed: number;
  thrusterSlots: number;
  itemType: 'EngineItem';
}

export type ThrusterItem = SellableItem & {
  addBaseSpeed: number;
  baseSpeedMultiplier: number;
  itemType: 'ThrusterItem';
}

export type LaserAmmoItem = SellableItem & {
  baseDamageMultiplier: number;
  itemType: 'LaserAmmoItem';
}