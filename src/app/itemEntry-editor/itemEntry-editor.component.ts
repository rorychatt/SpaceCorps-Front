import { Component } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { IItemEntry } from '../models/dataEntries/itemEntries/IItemEntry';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-itemEntry-editor',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    JsonPipe,
    FaIconComponent
  ],
  templateUrl: './itemEntry-editor.component.html',
  styleUrl: './itemEntry-editor.component.scss'
})
export class ItemEntryEditorComponent {

  protected itemCategories = [
    'ShipEntries',
    'LaserEntries', 'LaserAmpEntries',
    'ShieldEntries', 'ShieldCellEntries',
    'EngineEntries', 'ThrusterEntries',
    'LaserAmmoEntries'
  ]

  protected ItemEntries: { [key: string]: any }[] = [];
  protected newItem: { [key: string]: any } | null = {};
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
      this.newItem = this.createNewItemForCategory(category);
      this.fetchItems(category);
    }
  }

  protected fetchItems (category: string) {
    this.apiService.getItemEntriesByCategory(category).subscribe(
      {
        next: (data: any) => {
          this.ItemEntries = data;
        },
        error: (err: any) => {
          console.error('Error fetching items', err);
        }
      }
    );
  }

  protected createNewItem () {
    if (this.selectedCategory && this.newItem) {
      const oldCategory = this.selectedCategory;
      this.apiService
        .createNewItemEntry(this.selectedCategory, (this.newItem! as IItemEntry))
        .subscribe({
          next: () => {
            this.fetchItems(oldCategory);
          },
          error: (err: any) => {
            console.error('Error creating new item', err);
          }
        });
      this.newItem = null;
    }
  }

  protected getFieldsForCategory (category: string): { label: string, key: string }[] {
    const fieldsMap: { [key: string]: { label: string, key: string }[] } = {
      'LaserAmmoEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Base Damage Multiplier', key: 'baseDamageMultiplier' }
      ],
      'LaserAmpEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Add Base Damage', key: 'addBaseDamage' },
        { label: 'Add Laser Damage Multiplier', key: 'addLaserDamageMultiplier' },
        { label: 'Add Critical Chance', key: 'addCriticalChance' }
      ],
      'LaserEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Base Damage', key: 'baseDamage' },
        { label: 'Critical Chance', key: 'criticalChance' },
        { label: 'Laser Amp Slots', key: 'laserAmpSlots' }
      ],
      'ShieldEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Capacity', key: 'capacity' },
        { label: 'Recharge Rate', key: 'rechargeRate' },
        { label: 'Passive Recharge Rate', key: 'passiveRechargeRate' },
        { label: 'Absorbance', key: 'absorbance' },
        { label: 'Shield Cell Slots', key: 'shieldCellSlots' }
      ],
      'ShieldCellEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Add Capacity', key: 'addCapacity' },
        { label: 'Add Recharge Rate', key: 'addRechargeRate' },
        { label: 'Add Passive Recharge Rate', key: 'addPassiveRechargeRate' },
        { label: 'Add Absorbance', key: 'addAbsorbance' }
      ],
      'ShipEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Base Health', key: 'baseHealth' },
        { label: 'Base Speed', key: 'baseSpeed' },
        { label: 'Engine Slots', key: 'engineSlots' },
        { label: 'Shield Slots', key: 'shieldSlots' },
        { label: 'Laser Slots', key: 'laserSlots' }
      ],
      'EngineEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
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
      { label: 'ID', key: 'id' },
    ];
  }

  protected createNewItemForCategory (category: string): { [key: string]: any } {
    const fields = this.getFieldsForCategory(category);
    const newItem: { [key: string]: any } = {};
    fields.forEach(field => {
      newItem[field.key] = '';
    });
    return newItem;
  }

  trackByKey (index: number, item: any): any {
    return item.key;
  }

  protected deleteItem (item: { [key: string]: any }) {
    if (this.selectedCategory) {
      const oldCategory = this.selectedCategory;
      this.apiService.deleteItemEntry(this.selectedCategory, (item as IItemEntry)).subscribe({
        next: () => {
          this.fetchItems(oldCategory);
        },
        error: (err: any) => {
          console.error('Error deleting item', err);
        }
      });
    }
  }

  protected readonly faArrowsRotate = faArrowsRotate;
}
