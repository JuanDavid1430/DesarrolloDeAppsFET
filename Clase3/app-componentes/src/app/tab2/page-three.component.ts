import { Component, Input } from '@angular/core';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-page-three',
  template: `
    <ion-content class="ion-padding">
      <h1>Page Three</h1>
      <p>This is the final page in our navigation demo.</p>
      <ion-button (click)="navigateBack()" expand="block">Go Back</ion-button>
      <ion-button (click)="navigateToRoot()" expand="block" fill="outline">Go to Root</ion-button>
    </ion-content>
  `
})
export class PageThreeComponent {
  @Input() parentNav?: IonNav;

  constructor(private nav: IonNav) {}

  navigateBack() {
    const navToUse = this.parentNav || this.nav;
    navToUse.pop();
  }

  navigateToRoot() {
    const navToUse = this.parentNav || this.nav;
    navToUse.popToRoot();
  }
}