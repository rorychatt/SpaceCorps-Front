import { ShieldItem } from '../../player/Items';

export const defaultShields: ShieldItem[] = [
  {
    name: "Default Shield",
    itemType: "ShieldItem",
    id: 1,
    capacity: 10000,
    rechargeRate: 600,
    passiveRechargeRate: 0,
    absorbance: 0.8,
    shieldCellSlots: 2,
    priceCats: 60000,
    priceThulium: 0
  }
]
