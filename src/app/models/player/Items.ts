export type SellableItems =
  Ship |
  Laser |
  LaserAmp |
  Shield |
  ShieldCell |
  Engine |
  Thruster |
  LaserAmmo;

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

export type Ship = SellableItem & {
  baseHealth: number;
  baseSpeed: number;
  engineSlots: number;
  shieldSlots: number;
  laserSlots: number;
  itemType: 'Ship';
  engines?: Engine[];
  shields?: Shield[];
  lasers?: Laser[];
}


export type Laser = SellableItem & {
  baseDamage: number;
  criticalChance: number;
  laserAmpSlots: number;
  itemType: 'Laser';
  laserAmps?: LaserAmp[];
}


export type LaserAmp = SellableItem & {
  addBaseDamage: number;
  addCriticalChance: number;
  addLaserDamageMultiplier: number;
  itemType: 'LaserAmp';
}


export type Shield = SellableItem & {
  absorbance: number;
  capacity: number;
  passiveRechargeRate: number;
  rechargeRate: number;
  shieldCellSlots: number;
  itemType: 'Shield';
  shieldCells?: ShieldCell[];
}

export type ShieldCell = SellableItem & {
  addAbsorbance: number;
  addCapacity: number;
  addPassiveRechargeRate: number;
  addRechargeRate: number;
  itemType: 'ShieldCell';
}

export type Engine = SellableItem & {
  baseSpeed: number;
  thrusterSlots: number;
  itemType: 'Engine';
  thruster?: Thruster;
}


export type Thruster = SellableItem & {
  addBaseSpeed: number;
  baseSpeedMultiplier: number;
  itemType: 'Thruster';
}

export type LaserAmmo = SellableItem & {
  baseDamageMultiplier: number;
  itemType: 'LaserAmmo';
}

export function getFieldsForItemCategory(category: SellableItems['itemType']): { label: string, key: string }[] {
  const fieldsMap: { [K in SellableItems['itemType']]: { label: string, key: string }[] } = {
    'LaserAmmo': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Base Damage Multiplier', key: 'baseDamageMultiplier'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'LaserAmp': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Add Base Damage', key: 'addBaseDamage'},
      {label: 'Add Laser Damage Multiplier', key: 'addLaserDamageMultiplier'},
      {label: 'Add Critical Chance', key: 'addCriticalChance'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'Laser': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Base Damage', key: 'baseDamage'},
      {label: 'Critical Chance', key: 'criticalChance'},
      {label: 'Laser Amp Slots', key: 'laserAmpSlots'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'Shield': [
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
    'ShieldCell': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Add Capacity', key: 'addCapacity'},
      {label: 'Add Recharge Rate', key: 'addRechargeRate'},
      {label: 'Add Passive Recharge Rate', key: 'addPassiveRechargeRate'},
      {label: 'Add Absorbance', key: 'addAbsorbance'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'Ship': [
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
    'Engine': [
      {label: 'Name', key: 'name'},
      {label: 'ID', key: 'id'},
      {label: 'Base Speed', key: 'baseSpeed'},
      {label: 'Thruster Slots', key: 'thrusterSlots'},
      {label: 'Price in Cats', key: 'priceCats'},
      {label: 'Price in Thulium', key: 'priceThulium'}
    ],
    'Thruster': [
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
