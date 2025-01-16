import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import {getFieldsForItemCategory as getAllFieldsForItemCategory, SellableItems} from '../models/player/Items';

@Component({
    selector: 'app-ship-yard',
    templateUrl: './ship-yard.component.html',
    imports: [NgForOf, NgIf],
    styleUrls: ['./ship-yard.component.scss']
})
export class ShipYardComponent implements OnInit {

  categories: SellableItems['itemType'][] = [
    'ShipItem',
    'LaserItem',
    'LaserAmpItem',
    'ShieldItem',
    'ShieldCellItem',
    'EngineItem',
    'ThrusterItem',
    'LaserAmmoItem',
  ];

  selectedCategory: SellableItems['itemType'] | null = null;
  items: SellableItems[] = [];

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

  selectCategory (category: SellableItems['itemType']) {
    this.selectedCategory = category;
    this.fetchItems(category);
  }

  fetchItems (category: SellableItems['itemType']) {
    this.apiService.getItemEntriesByCategory(category).subscribe((data) => {
      this.items = data as SellableItems[];
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

  buyItem (item: SellableItems) {

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

  protected getFieldsForItemCategory(category: SellableItems['itemType']){
    const fields = getAllFieldsForItemCategory(category);
    return fields.filter(field => !['name', 'id', 'priceCats', 'priceThulium'].includes(field.key));
  }

  protected readonly JSON = JSON;
}
