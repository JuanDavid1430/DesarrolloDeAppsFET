import { Component, Input } from '@angular/core';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-page-two',
  template: `
    <ion-content class="ion-padding">
      <h1>Page Two</h1>
      <p>This is the second page. You can go forward or back.</p>
      <ion-button (click)="navigateToPageThree()" expand="block">Go to Page Three</ion-button>
      <ion-button (click)="navigateBack()" expand="block" fill="outline">Go Back</ion-button>
    </ion-content>
  `
})
export class PageTwoComponent {
  @Input() parentNav?: IonNav;

  constructor(private nav: IonNav) {}

  navigateToPageThree() {
    const navToUse = this.parentNav || this.nav;
    navToUse.push('PageThreeComponent');
  }

  navigateBack() {
    const navToUse = this.parentNav || this.nav;
    navToUse.pop();
  }
}