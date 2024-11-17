import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { SpaceMapDataEntry } from '../models/dataEntries/SpaceMapDataEntry';
import { UpdateSpaceMapDataEntryRequest } from '../models/dataEntries/UpdateSpaceMapDataEntryRequest';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-spacemap-editor',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass,
    ErrorModalComponent,
  ],
  templateUrl: './spacemap-editor.component.html',
  styleUrl: './spacemap-editor.component.scss'
})
export class SpacemapEditorComponent {

  spaceMapDataEntryNames: string[] = [];
  selectedSpaceMapDataEntry: SpaceMapDataEntry | null = null;
  selectedSpaceMapDataEntryName: string | null = null;
  newSpaceMapName: string | null = null;
  error: HttpErrorResponse | null = null;

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

  createDefaultStarMap () {

    const m1Map: SpaceMapDataEntry = {
      name: 'M-1',
      size: { width: 320, height: 180 },
      preferredColor: 'red',
      spawnableAliens: [],
      staticEntities: []
    }

    const t1Map: SpaceMapDataEntry = {
      name: 'T-1',
      size: { width: 320, height: 180 },
      preferredColor: 'blue',
      spawnableAliens: [],
      staticEntities: []
    }

    const v1Map: SpaceMapDataEntry = {
      name: 'V-1',
      size: { width: 320, height: 180 },
      preferredColor: 'green',
      spawnableAliens: [],
      staticEntities: []
    }

    this.createAndUpdateSpaceMapDataEntry(m1Map);
    this.createAndUpdateSpaceMapDataEntry(t1Map);
    this.createAndUpdateSpaceMapDataEntry(v1Map);

    this.fetchSpaceMapDataEntryNames();
  }

  private createAndUpdateSpaceMapDataEntry(map: SpaceMapDataEntry) {
    this.apiService.postSpaceMapDataEntry(map.name).subscribe(() => {
      this.apiService.updateSpaceMapDataEntry(map.name, map).subscribe(() => {
        console.log(`${map.name} SpaceMapDataEntry created and updated successfully`);
      });
    });
  }
}
