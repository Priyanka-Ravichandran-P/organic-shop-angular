import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';

@Component({
    template: `<a [routerLink]="[params.inRouterLink,resourceId]">Edit</a>`
})
export class MyLinkRendererComponent implements AgRendererComponent {    
    params: any;    
    resourceId;
    agInit(params: any): void {
        this.params = params;
        this.resourceId = params.data.key;
    }

    refresh(params: any): boolean {
        return false;
    }    
}