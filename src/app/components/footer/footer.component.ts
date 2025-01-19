import { Component, inject } from '@angular/core';
import { version, reqBackendVersion } from '../../../../package.json';
import { AsyncPipe, NgIf } from "@angular/common";

import { ApiService } from "../../services/api.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {

    clientVersion: string = version;
    serverVersion: string | null = null;

    // minimalBackVersion: string = reqBackendVersion;

    apiService = inject(ApiService)

    ngOnInit() {
        this.apiService.getBackendVersion().subscribe({
            next: (serverInfo) => {
                this.serverVersion = serverInfo.version
            },
            error: (error) => {
                console.error(error)
            }
        });

    }
    getMinorVersion(vers: string): number {
        return parseInt(vers.split('.')[1])
    }
}
