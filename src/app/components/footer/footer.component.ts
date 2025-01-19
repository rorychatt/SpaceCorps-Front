import { Component, inject } from '@angular/core';
import { version, reqBackendVersion } from '../../../../package.json';
import { ApiService } from "../../services/api.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {

    clientVersion: string = version;
    outDated: boolean = false;
    serverVersion: string | null = null;

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

        if (this.serverVersion) {
            if (
                this.getMinorVersion(this.serverVersion) >
                this.getMinorVersion(reqBackendVersion)
            ) {
                this.outDated = true;
            }
        }

    }

    private getMinorVersion(fullVersion: string): number {
        return parseInt(fullVersion.split('.')[1])
    }
}
