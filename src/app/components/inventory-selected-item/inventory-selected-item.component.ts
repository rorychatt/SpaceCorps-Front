import { Component, Input } from '@angular/core';
import { SellableItems } from '../../models/player/Items';

@Component({
  selector: 'app-inventory-selected-item',
  templateUrl: './inventory-selected-item.component.html',
  styleUrl: './inventory-selected-item.component.scss'
})
export class InventorySelectedItemComponent {

  @Input({
    required: true
  }) selectedItem: SellableItems | null = null;


  /**
   * Returns an array of mapping objects for the selected item's slot groups.
   * Each mapping includes:
   *  - childrenKey: the property name for the children array (e.g. 'thrusters')
   *  - maxSlots: the corresponding integer property for the max allowed slots (e.g. thrusterSlots)
   *  - title: a descriptive title for that slot group.
   */
  getChildMapping(item: SellableItems): { childrenKey: string, maxSlots: number, title: string }[] {
    switch (item.itemType) {
      case 'Ship':
        return [
          { childrenKey: 'engines', maxSlots: (item as any).engineSlots, title: 'Engines' },
          { childrenKey: 'shields', maxSlots: (item as any).shieldSlots, title: 'Shields' },
          { childrenKey: 'lasers', maxSlots: (item as any).laserSlots, title: 'Lasers' }
        ];
      case 'Laser':
        return [
          { childrenKey: 'laserAmps', maxSlots: (item as any).laserAmpSlots, title: 'Laser Amps' }
        ];
      case 'Shield':
        return [
          { childrenKey: 'shieldCells', maxSlots: (item as any).shieldCellSlots, title: 'Shield Cells' }
        ];
      case 'Engine':
        return [
          { childrenKey: 'thrusters', maxSlots: (item as any).thrusterSlots, title: 'Thrusters' }
        ];
      default:
        return [];
    }
  }

  /**
   * Returns an array of indices from 0 to (maxSlots - 1) so that the template
   * always renders exactly maxSlots slots.
   */
  getSlots(maxSlots: number): number[] {
    return Array.from({ length: maxSlots }, (_, i) => i);
  }

  /**
   * Prevents the default behavior to allow dropping an item.
   */
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  /**
   * Called when an item is dropped into an empty slot.
   */
  onDrop(event: DragEvent, mapping: { childrenKey: string, maxSlots: number, title: string }, slotIndex: number) {
    event.preventDefault();
    console.log(`Dropped an item into ${mapping.title} at slot index: ${slotIndex}`);
    // TODO: Add logic here to handle the dropped item and assign it to the appropriate slot.
  }
}
