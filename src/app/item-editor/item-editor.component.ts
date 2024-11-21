import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-item-editor',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './item-editor.component.html',
  styleUrl: './item-editor.component.scss'
})
export class ItemEditorComponent {

  protected itemCategories = [
    'Ships',
    'Lasers', 'Laser Amps',
    'Shields', 'Shield Cells',
    'Engines', 'Thrusters',
    'Laser Ammo'
  ]

  protected selectedCategory: string | null = null;

  protected selectCategory (item: string) {
    this.selectedCategory = item;
  }
}
