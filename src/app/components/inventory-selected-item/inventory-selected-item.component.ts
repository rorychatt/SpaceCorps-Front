import { Component, Input } from '@angular/core';
import { Engine, Laser, SellableItems, Shield, Ship } from '../../models/player/Items';

@Component({
  selector: 'app-inventory-selected-item',
  templateUrl: './inventory-selected-item.component.html',
  styleUrl: './inventory-selected-item.component.scss'
})
export class InventorySelectedItemComponent {

  @Input({
    required: true
  }) selectedItem: SellableItems | null = null;

  draggedItem: SellableItems | null = null;

  getChildMapping (item: SellableItems): { childrenKey: string, maxSlots: number, title: string }[] {
    switch (item.itemType) {
      case 'Ship':
        return [
          { childrenKey: 'engines', maxSlots: (item as Ship).engineSlotCount, title: 'Engines' },
          { childrenKey: 'shields', maxSlots: (item as Ship).shieldSlotCount, title: 'Shields' },
          { childrenKey: 'lasers', maxSlots: (item as Ship).laserSlotCount, title: 'Lasers' }
        ];
      case 'Laser':
        return [
          { childrenKey: 'laserAmps', maxSlots: (item as Laser).laserAmpSlotCount, title: 'Laser Amps' }
        ];
      case 'Shield':
        return [
          { childrenKey: 'shieldCells', maxSlots: (item as Shield).shieldCellSlotCount, title: 'Shield Cells' }
        ];
      case 'Engine':
        return [
          { childrenKey: 'thrusters', maxSlots: (item as Engine).thrusterSlotCount, title: 'Thrusters' }
        ];
      default:
        return [];
    }
  }

  getSlots (maxSlots: number): number[] {
    return Array.from({ length: maxSlots }, (_, i) => i);
  }

  onDragOver (event: DragEvent) {
    event.preventDefault();
  }

  onDragStart (event: DragEvent, item: SellableItems) {
    this.draggedItem = item;
  }

  onDrop (event: DragEvent, mapping: { childrenKey: string, maxSlots: number, title: string }, slotIndex: number) {
    event.preventDefault();
    if (this.draggedItem) {
      console.log(`Dropped ${this.draggedItem.name} into ${mapping.title} at slot index: ${slotIndex}`);
      // TODO: Add logic here to handle the dropped item and assign it to the appropriate slot.
      this.draggedItem = null;
    }
  }
}
