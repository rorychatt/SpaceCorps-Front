import { LaserEntry } from '../LaserEntry';

export const defaultLasers: LaserEntry[] = [
  {
    name: 'Quantum Laser 1',
    itemType: 'LaserItem',
    id: 1,
    baseDamage: 50,
    criticalChance: 0.1,
    laserAmpSlots: 1,
    priceCats: 10000,
    priceThulium: 0
  },
  {
    name: 'Quantum Laser 2',
    itemType: 'LaserItem',
    id: 2,
    baseDamage: 60,
    criticalChance: 0.2,
    laserAmpSlots: 2,
    priceCats: 20000,
    priceThulium: 0
  },
  {
    name: 'Quantum Laser 3',
    itemType: 'LaserItem',
    id: 3,
    baseDamage: 70,
    criticalChance: 0.3,
    laserAmpSlots: 3,
    priceCats: 0,
    priceThulium: 10000
  }
]
