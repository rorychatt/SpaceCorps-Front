import { Component } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { IItemEntry } from '../models/dataEntries/itemEntries/IItemEntry';

@Component({
  selector: 'app-item-editor',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    JsonPipe
  ],
  templateUrl: './item-editor.component.html',
  styleUrl: './item-editor.component.scss'
})
export class ItemEditorComponent {

  protected itemCategories = [
    'ShipEntries',
    'LaserEntries', 'LaserAmpEntries',
    'ShieldEntries', 'ShieldCellEntries',
    'EngineEntries', 'ThrusterEntries',
    'LaserAmmoEntries'
  ]

  protected ItemEntries: IItemEntry[] = [];
  protected newItem: IItemEntry | null = null;
  protected selectedCategory: string | null = null;

  constructor (private apiService: ApiService) {
  }

  ngOnInit () {
  }

  protected selectCategory (category: string) {
    if (this.selectedCategory === category) {
      return;
    } else {
      this.selectedCategory = category;
      this.newItem = null;
    }
  }

  protected fetchItems (category: string) {
    this.apiService.getItemEntriesByCategory(category).subscribe((data: IItemEntry[]) => {
      this.ItemEntries = data;
    });
  }

  protected createNewItem () {
    if (this.selectedCategory) {
      const oldCategory = this.selectedCategory;
      this.newItem = null;
      // this.apiService.createNewItemEntry(this.selectedCategory).subscribe((data: IItemEntry) => {
      //   this.fetchItems(oldCategory);
      // });
    }
  }

  protected getFieldsForCategory(category: string): { label: string, key: string }[] {
    const fieldsMap: { [key: string]: { label: string, key: string }[] } = {
      'LaserAmmoEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Base Damage Multiplier', key: 'baseDamageMultiplier' }
      ],
      'LaserAmpEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Add Base Damage', key: 'addBaseDamage' },
        { label: 'Add Laser Damage Multiplier', key: 'addLaserDamageMultiplier' },
        { label: 'Add Critical Chance', key: 'addCriticalChance' }
      ],
      'LaserEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Base Damage', key: 'baseDamage' },
        { label: 'Critical Chance', key: 'criticalChance' },
        { label: 'Laser Amp Slots', key: 'laserAmpSlots' }
      ],
      'ShieldEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Capacity', key: 'capacity' },
        { label: 'Recharge Rate', key: 'rechargeRate' },
        { label: 'Passive Recharge Rate', key: 'passiveRechargeRate' },
        { label: 'Absorbance', key: 'absorbance' },
        { label: 'Shield Cell Slots', key: 'shieldCellSlots' }
      ],
      'ShieldCellEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Add Capacity', key: 'addCapacity' },
        { label: 'Add Recharge Rate', key: 'addRechargeRate' },
        { label: 'Add Passive Recharge Rate', key: 'addPassiveRechargeRate' },
        { label: 'Add Absorbance', key: 'addAbsorbance' }
      ],
      'ShipEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Base Health', key: 'baseHealth' },
        { label: 'Base Speed', key: 'baseSpeed' },
        { label: 'Engine Slots', key: 'engineSlots' },
        { label: 'Laser Slots', key: 'laserSlots' }
      ],
      'EngineEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Base Speed', key: 'baseSpeed' },
        { label: 'Thruster Slots', key: 'thrusterSlots' }
      ],
      'ThrusterEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Add Base Speed', key: 'addBaseSpeed' },
        { label: 'Base Speed Multiplier', key: 'baseSpeedMultiplier' }
      ]
    };

    return fieldsMap[category] || [
      { label: 'Name', key: 'name' },
    ];
  }
}
