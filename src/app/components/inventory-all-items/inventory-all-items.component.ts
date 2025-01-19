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
}
