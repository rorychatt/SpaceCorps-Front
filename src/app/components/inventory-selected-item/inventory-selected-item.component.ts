import { Component, Input } from '@angular/core';
import { SellableItem, SellableItems } from '../../models/player/Items';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-inventory-selected-item',
  imports: [NgIf, NgFor],
  templateUrl: './inventory-selected-item.component.html',
  styleUrl: './inventory-selected-item.component.scss'
})
export class InventorySelectedItemComponent {

  @Input({
    required: true
  }) selectedItem: SellableItems | null = null;

  getChildMapping(item: SellableItems): { childrenKey: string, slots: number, title: string }[] {
    switch (item.itemType) {
      case 'ShipItem':
        return [
          { childrenKey: 'engines', slots: (item as any).engineSlots, title: 'Engines' },
          { childrenKey: 'shields', slots: (item as any).shieldSlots, title: 'Shields' },
          { childrenKey: 'lasers', slots: (item as any).laserSlots, title: 'Lasers' }
        ];
      case 'LaserItem':
        return [
          { childrenKey: 'laserAmps', slots: (item as any).laserAmpSlots, title: 'Laser Amps' }
        ];
      case 'ShieldItem':
        return [
          { childrenKey: 'shieldCells', slots: (item as any).shieldCellSlots, title: 'Shield Cells' }
        ];
      case 'EngineItem':
        return [
          { childrenKey: 'thrusters', slots: (item as any).thrusterSlots, title: 'Thrusters' }
        ];
      default:
        return [];
    }
  }

  createSlots(count: number): any[] {
    return new Array(count);
  }
}
