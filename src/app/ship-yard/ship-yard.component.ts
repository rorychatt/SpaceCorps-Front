import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

interface Item {
  name: string;
  category: string;
  priceCats: number;
  priceThulium: number;
  icon: string;
}

@Component({
  selector: 'app-ship-yard',
  templateUrl: './ship-yard.component.html',
  standalone: true,
  imports: [NgForOf, NgIf],
  styleUrls: ['./ship-yard.component.scss'],
})
export class ShipYardComponent implements OnInit {
  categories: string[] = [
    'Ships',
    'Lasers',
    'Laser Amps',
    'Shields',
    'Shield Cells',
    'Engines',
    'Engine Thrusters',
    'Laser Ammo',
  ];
  selectedCategory: string | null = null;
  items: SellableItem[] = [];
  playerBalance = { cats: 0, thulium: 0 };
  username: string | null = null;

  constructor (
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  ngOnInit () {
    this.fetchPlayerData();
  }

  selectCategory (category: string) {
    this.selectedCategory = category;
    this.fetchItems(category);
  }

  fetchItems (category: string) {
    const categoryKey =
      ItemTypeDictionary[category as keyof typeof ItemTypeDictionary];
    this.apiService.getItemEntriesByCategory(categoryKey).subscribe((data) => {
      this.items = data as SellableItem[];
    });
  }

  fetchPlayerData () {

    if (!this.username) {
      const playerData = this.authService.getPlayerData();

      if (!playerData) {
        console.error('Player data not found');
        return;
      }

      this.username = playerData.username;
    }

    this.apiService
      .getPlayerInfo({ username: this.username })
      .subscribe((data) => {
        this.playerBalance.cats = data.cats;
        this.playerBalance.thulium = data.thulium;
      });

  }

  buyItem (item: SellableItem) {

    if (this.username === null) {
      alert('No username found');
      return;
    }

    if (item.priceCats > this.playerBalance.cats) {
      alert('Not enough cats');
      return;
    }

    if (item.priceThulium > this.playerBalance.thulium) {
      alert('Not enough thulium');
      return;
    }

    this.apiService
      .buyItem({
        username: this.username,
        itemId: item.id,
        itemType: item.itemType
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error('Error buying item', error);
        }
      );
  }
}

type SellableItem = {
  itemType: string;
  id: number;
  name: string;
  priceCats: number;
  priceThulium: number;
  category: string;
};

const ItemTypeDictionary = {
  'Ships': 'ShipEntries',
  'Lasers': 'LaserEntries',
  'Laser Amps': 'LaserAmpEntries',
  'Shields': 'ShieldEntries',
  'Shield Cells': 'ShieldCellEntries',
  'Engines': 'EngineEntries',
  'Engine Thrusters': 'ThrusterEntries',
  'Laser Ammo': 'LaserAmmoEntries',
};
