import {Component, Input} from '@angular/core';
import {InventoryItem} from '../../models/player/InventoryItem';

@Component({
  selector: 'app-inventory-all-items',
  imports: [],
  templateUrl: './inventory-all-items.component.html',
  styleUrl: './inventory-all-items.component.scss'
})
export class InventoryAllItemsComponent {
  @Input({
    required: true
  }) items: InventoryItem[] | undefined;

  ngOnInit() {

    if (!this.items) {
      console.warn('No items were provided to the InventoryAllItemsComponent');
      this.items = [];
    }

    // sort items by item type and then by item name
    this.items = this.items.sort((a, b) => {
      if (a.itemType === b.itemType) {
        return a.name.localeCompare(b.name);
      } else {
        return a.itemType.localeCompare(b.itemType);
      }
    });
  }
}
