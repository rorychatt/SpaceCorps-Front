import { InventoryItem } from "./InventoryItem";

export type SellableItems = 
  ShipItem & SellableItem |
  LaserItem & SellableItem |
  LaserAmpItem & SellableItem |
  ShieldItem & SellableItem |
  ShieldCellItem & SellableItem |
  EngineItem & SellableItem |
  EngineThrusterItem & SellableItem |
  LaserAmmoItem & SellableItem;

type SellableItem = InventoryItem & {
  priceCats: number;
  priceThulium: number;
};

type ShipItem = InventoryItem & {
  baseHealth: number;
  baseSpeed: number;
  engineSlots: number;
  shieldSlots: number;
  laserSlots: number;
}

type LaserItem = InventoryItem & {
  baseDamage: number;
  criticalChance: number;
  laserAmpSlots: number;
}

type LaserAmpItem = InventoryItem & {
  addBaseDamage: number;
  addCriticalChance: number;
  addLaserDamageMultiplier: number;
}

type ShieldItem = InventoryItem & {
  absorbance: number;
  capacity: number;
  passiveRechargeRate: number;
  rechargeRate: number;
  shieldCellSlots: number;
}

type ShieldCellItem = InventoryItem & {
  addAbsorbance: number;
  addCapacity: number;
  addPassiveRechargeRate: number;
  addRechargeRate: number;
}

type EngineItem = InventoryItem & {
  baseSpeed: number;
}

type EngineThrusterItem = InventoryItem & {
  addBaseSpeed: number;
  addBaseSpeedMultiplier: number;
}

type LaserAmmoItem = InventoryItem & {
  baseDamageMultiplier: number;
}