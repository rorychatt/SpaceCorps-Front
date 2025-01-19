import { Component } from '@angular/core';
import {InventoryActiveShipComponent} from '../components/inventory-active-ship/inventory-active-ship.component';

@Component({
  selector: 'app-pilot-inventory',
  imports: [
    InventoryActiveShipComponent
  ],
  templateUrl: './pilot-inventory.component.html',
  styleUrl: './pilot-inventory.component.scss'
})
export class PilotInventoryComponent {

}
