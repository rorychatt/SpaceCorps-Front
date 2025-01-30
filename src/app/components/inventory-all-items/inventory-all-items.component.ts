import {Component, Input, OnInit} from '@angular/core';
import {InventoryItem} from '../../models/player/InventoryItem';

@Component({
  selector: 'app-inventory-all-items',
  imports: [],
  templateUrl: './inventory-all-items.component.html',
  styleUrl: './inventory-all-items.component.scss'
})
export class InventoryAllItemsComponent implements OnInit {
  @Input({
    required: true
  }) items?: InventoryItem[] = [];

  categorizedItems: Map<string, InventoryItem[]> =
    new Map<string, InventoryItem[]>();

  ngOnInit() {

    // Categorize items
    this.items?.forEach(item => {
      if(!this.categorizedItems.has(item.itemType)) {
        this.categorizedItems.set(item.itemType, [item]);
      } else {
        this.categorizedItems.get(item.itemType)!.push(item);
      }

    });

    // Sort items per category
    this.categorizedItems.forEach((items) => {
      items.sort((a, b) => a.name.localeCompare(b.name));
    });

    console.log("Items loaded and sorted in inventory: ", this.items);
  }
}
