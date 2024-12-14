import { Component } from '@angular/core';
import { JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { IItemEntry } from '../models/dataEntries/itemEntries/IItemEntry';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  defaultEngines, defaultLaserAmmos,
  defaultLaserAmps,
  defaultLasers, defaultShieldCells, defaultShields, defaultShips,
  defaultThrusters
} from '../models/dataEntries/itemEntries/itemEntryGenScripts';
import { firstValueFrom } from 'rxjs';


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
        { label: 'Base Damage Multiplier', key: 'baseDamageMultiplier' },
        { label: 'Price in Cats', key: 'priceCats' },
        { label: 'Price in Thulium', key: 'priceThulium' }
      ],
      'LaserAmpEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Add Base Damage', key: 'addBaseDamage' },
        { label: 'Add Laser Damage Multiplier', key: 'addLaserDamageMultiplier' },
        { label: 'Add Critical Chance', key: 'addCriticalChance' },
        { label: 'Price in Cats', key: 'priceCats' },
        { label: 'Price in Thulium', key: 'priceThulium' }
      ],
      'LaserEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Base Damage', key: 'baseDamage' },
        { label: 'Critical Chance', key: 'criticalChance' },
        { label: 'Laser Amp Slots', key: 'laserAmpSlots' },
        { label: 'Price in Cats', key: 'priceCats' },
        { label: 'Price in Thulium', key: 'priceThulium' }
      ],
      'ShieldEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Capacity', key: 'capacity' },
        { label: 'Recharge Rate', key: 'rechargeRate' },
        { label: 'Passive Recharge Rate', key: 'passiveRechargeRate' },
        { label: 'Absorbance', key: 'absorbance' },
        { label: 'Shield Cell Slots', key: 'shieldCellSlots' },
        { label: 'Price in Cats', key: 'priceCats' },
        { label: 'Price in Thulium', key: 'priceThulium' }
      ],
      'ShieldCellEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Add Capacity', key: 'addCapacity' },
        { label: 'Add Recharge Rate', key: 'addRechargeRate' },
        { label: 'Add Passive Recharge Rate', key: 'addPassiveRechargeRate' },
        { label: 'Add Absorbance', key: 'addAbsorbance' },
        { label: 'Price in Cats', key: 'priceCats' },
        { label: 'Price in Thulium', key: 'priceThulium' }
      ],
      'ShipEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Base Health', key: 'baseHealth' },
        { label: 'Base Speed', key: 'baseSpeed' },
        { label: 'Engine Slots', key: 'engineSlots' },
        { label: 'Shield Slots', key: 'shieldSlots' },
        { label: 'Laser Slots', key: 'laserSlots' },
        { label: 'Price in Cats', key: 'priceCats' },
        { label: 'Price in Thulium', key: 'priceThulium' }
      ],
      'EngineEntries': [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Base Speed', key: 'baseSpeed' },
        { label: 'Thruster Slots', key: 'thrusterSlots' },
        { label: 'Price in Cats', key: 'priceCats' },
        { label: 'Price in Thulium', key: 'priceThulium' }
      ],
      'ThrusterEntries': [
        { label: 'Name', key: 'name' },
        { label: 'Add Base Speed', key: 'addBaseSpeed' },
        { label: 'Base Speed Multiplier', key: 'baseSpeedMultiplier' },
        { label: 'Price in Cats', key: 'priceCats' },
        { label: 'Price in Thulium', key: 'priceThulium' }
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

  generateDefaultItemsForCategory (selectedCategory: string) {
    switch (selectedCategory) {
      case 'EngineEntries':
        this.generateDefaultEngineItems();
        break;
      case 'ThrusterEntries':
        this.generateDefaultThrusterItems();
        break;
      case 'LaserEntries':
        this.generateDefaultLaserItems();
        break;
      case 'LaserAmpEntries':
        this.generateDefaultLaserAmpItems();
        break;
      case 'ShieldEntries':
        this.generateDefaultShieldItems();
        break;
      case 'ShieldCellEntries':
        this.generateDefaultShieldCellItems();
        break;
      case 'ShipEntries':
        this.generateDefaultShipItems();
        break;
      case 'LaserAmmoEntries':
        this.generateDefaultLaserAmmoItems();
        break;
      default:
        console.error('No default items for category', selectedCategory);
    }
    this.fetchItems(selectedCategory);
  }

  private generateDefaultEngineItems () {
    defaultEngines.map(async (engine) => {
      await firstValueFrom(this.apiService.createNewItemEntry('EngineEntries', engine))
    });
  }

  private generateDefaultThrusterItems () {
    defaultThrusters.map(async (thruster) => {
      await firstValueFrom(this.apiService.createNewItemEntry('ThrusterEntries', thruster))
    });
  }

  private generateDefaultLaserItems () {
    defaultLasers.map(async (laser) => {
      await firstValueFrom(this.apiService.createNewItemEntry('LaserEntries', laser))
    });
  }

  private generateDefaultLaserAmpItems () {
    defaultLaserAmps.map(async (laserAmp) => {
      await firstValueFrom(this.apiService.createNewItemEntry('LaserAmpEntries', laserAmp))
    });
  }

  private generateDefaultShieldItems () {
    defaultShields.map(async (shield) => {
      await firstValueFrom(this.apiService.createNewItemEntry('ShieldEntries', shield))
    });
  }

  private generateDefaultShieldCellItems () {
    defaultShieldCells.map(async (shieldCell) => {
      await firstValueFrom(this.apiService.createNewItemEntry('ShieldCellEntries', shieldCell))
    });
  }

  private generateDefaultShipItems () {
    defaultShips.map(async (ship) => {
      await firstValueFrom(this.apiService.createNewItemEntry('ShipEntries', ship))
    });
  }

  private generateDefaultLaserAmmoItems () {
    defaultLaserAmmos.map(async (laserAmmo) => {
      await firstValueFrom(this.apiService.createNewItemEntry('LaserAmmoEntries', laserAmmo))
    });
  }

  protected createAllDefaultItems () {
    this.generateDefaultEngineItems();
    this.generateDefaultThrusterItems();
    this.generateDefaultLaserItems();
    this.generateDefaultLaserAmpItems();
    this.generateDefaultShieldItems();
    this.generateDefaultShieldCellItems();
    this.generateDefaultShipItems();
    this.generateDefaultLaserAmmoItems();
  }
}
