import { Ship } from "../../player/Items";

export const defaultShips: Ship[] = [
  {
    name: "Protos",
    itemType: "Ship",
    id: 1,
    baseHealth: 8000,
    baseSpeed: 150,
    engineSlotCount: 2,
    shieldSlotCount: 2,
    laserSlotCount: 2,
    priceCats: 1111,
    priceThulium: 0
  },
  {
    name: "Ostrion",
    itemType: "Ship",
    id: 2,
    baseHealth: 32000,
    baseSpeed: 180,
    engineSlotCount: 4,
    shieldSlotCount: 3,
    laserSlotCount: 3,
    priceCats: 155000,
    priceThulium: 0
  },
  {
    name: "Paragon",
    itemType: "Ship",
    id: 3,
    baseHealth: 96000,
    baseSpeed: 200,
    engineSlotCount: 5,
    shieldSlotCount: 5,
    laserSlotCount: 5,
    priceCats: 655000,
    priceThulium: 0
  },
  {
    name: "Echelon",
    itemType: "Ship",
    id: 4,
    baseHealth: 128000,
    baseSpeed: 210,
    engineSlotCount: 6,
    shieldSlotCount: 6,
    laserSlotCount: 6,
    priceCats: 0,
    priceThulium: 12000
  },
  {
    name: "Specter",
    itemType: "Ship",
    id: 5,
    baseHealth: 196000,
    baseSpeed: 185,
    engineSlotCount: 8,
    shieldSlotCount: 6,
    laserSlotCount: 6,
    priceCats: 1000000,
    priceThulium: 0
  },
  {
    name: "Orionix",
    itemType: "Ship",
    id: 6,
    baseHealth: 256000,
    baseSpeed: 225,
    engineSlotCount: 12,
    shieldSlotCount: 10,
    laserSlotCount: 10,
    priceCats: 0,
    priceThulium: 25000
  },
  {
    name: "Wraith",
    itemType: "Ship",
    id: 7,
    baseHealth: 324000,
    baseSpeed: 210,
    engineSlotCount: 14,
    shieldSlotCount: 14,
    laserSlotCount: 14,
    priceCats: 0,
    priceThulium: 65000
  }
];
