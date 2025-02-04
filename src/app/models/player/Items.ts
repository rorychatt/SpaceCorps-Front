export type SellableItems =
  ShipItem |
  LaserItem |
  LaserAmpItem |
  ShieldItem |
  ShieldCellItem |
  EngineItem |
  ThrusterItem |
  LaserAmmoItem;

export type InventoryItem = {
  id: number;
  name: string;
  itemType: string;
}

export type SellableItem = InventoryItem & {
  priceCats: number;
  priceThulium: number;
  [key: string]: any;
};

export type ShipItem = SellableItem & {
  baseHealth: number;
  baseSpeed: number;
  engineSlots: number;
  shieldSlots: number;
  laserSlots: number;
  itemType: 'ShipItem';
  engines?: EngineItem[];
  shields?: ShieldItem[];
  lasers?: LaserItem[];
}


export type LaserItem = SellableItem & {
  baseDamage: number;
  criticalChance: number;
  laserAmpSlots: number;
  itemType: 'LaserItem';
  laserAmps?: LaserAmpItem[];
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
  shieldCells?: ShieldCellItem[];
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
  thruster?: ThrusterItem;
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

export function getFieldsForItemCategory(category: SellableItems['itemType']): { label: string, key: string }[] {
  const fieldsMap: { [K in SellableItems['itemType']]: { label: string, key: string }[] } = {
    'LaserAmmoItem': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Base Damage Multiplier', key: 'baseDamageMultiplier'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'LaserAmpItem': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Add Base Damage', key: 'addBaseDamage'},
      {label: 'Add Laser Damage Multiplier', key: 'addLaserDamageMultiplier'},
      {label: 'Add Critical Chance', key: 'addCriticalChance'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'LaserItem': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Base Damage', key: 'baseDamage'},
      {label: 'Critical Chance', key: 'criticalChance'},
      {label: 'Laser Amp Slots', key: 'laserAmpSlots'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'ShieldItem': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Capacity', key: 'capacity'},
      {label: 'Recharge Rate', key: 'rechargeRate'},
      {label: 'Passive Recharge Rate', key: 'passiveRechargeRate'},
      {label: 'Absorbance', key: 'absorbance'},
      {label: 'Shield Cell Slots', key: 'shieldCellSlots'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'ShieldCellItem': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Add Capacity', key: 'addCapacity'},
      {label: 'Add Recharge Rate', key: 'addRechargeRate'},
      {label: 'Add Passive Recharge Rate', key: 'addPassiveRechargeRate'},
      {label: 'Add Absorbance', key: 'addAbsorbance'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'ShipItem': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Base Health', key: 'baseHealth'},
      {label: 'Base Speed', key: 'baseSpeed'},
      {label: 'Engine Slots', key: 'engineSlots'},
      {label: 'Shield Slots', key: 'shieldSlots'},
      {label: 'Laser Slots', key: 'laserSlots'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'EngineItem': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Base Speed', key: 'baseSpeed'},
      {label: 'Thruster Slots', key: 'thrusterSlots'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'ThrusterItem': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Add Base Speed', key: 'addBaseSpeed'},
      {label: 'Base Speed Multiplier', key: 'baseSpeedMultiplier'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ]
  };

  return fieldsMap[category] || [
    {label: 'Name', key: 'name'},
    {label: 'ID', key: 'id'},
  ];
}
