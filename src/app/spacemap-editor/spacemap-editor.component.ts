import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { SpaceMapDataEntry } from '../models/dataEntries/SpaceMapDataEntry';
import { UpdateSpaceMapDataEntryRequest } from '../models/dataEntries/UpdateSpaceMapDataEntryRequest';

@Component({
  selector: 'app-spacemap-editor',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass,
  ],
  templateUrl: './spacemap-editor.component.html',
  styleUrl: './spacemap-editor.component.scss'
})
export class SpacemapEditorComponent {

  spaceMapDataEntryNames: string[] = [];
  selectedSpaceMapDataEntry: SpaceMapDataEntry | null = null;
  selectedSpaceMapDataEntryName: string | null = null;
  newSpaceMapName: string | null = null;

  constructor (private apiService: ApiService) {
  }

  ngOnInit () {
    this.fetchSpaceMapDataEntryNames();
  }

  fetchSpaceMapDataEntryNames () {
    this.apiService.getSpaceMapDataEntryNames().subscribe((data: string[]) => {
      this.spaceMapDataEntryNames = data;
    });
  }

  selectSpaceMapDataEntry (name: string) {
    this.selectedSpaceMapDataEntryName = name;
    this.apiService.getSpaceMapDataEntry(name).subscribe((data: SpaceMapDataEntry) => {
      this.selectedSpaceMapDataEntry = data;
      console.log("Fetched SpaceMapDataEntry: ", data);
    });
  }

  postSpaceMapDataEntryByName (newName: string) {
    this.apiService.postSpaceMapDataEntry(newName).subscribe(() => {
      this.fetchSpaceMapDataEntryNames();
    });
    this.newSpaceMapName = null;
  }

  updateSpaceMapDataEntry () {
    if (this.selectedSpaceMapDataEntry && this.selectedSpaceMapDataEntryName) {
      const updateRequest: UpdateSpaceMapDataEntryRequest = {
        size: this.selectedSpaceMapDataEntry.size,
        preferredColor: this.selectedSpaceMapDataEntry.preferredColor,
      };

      this.apiService.updateSpaceMapDataEntry(this.selectedSpaceMapDataEntryName, updateRequest)
        .subscribe(() => {
          console.log('SpaceMapDataEntry updated successfully');
        });
    }
  }

}
