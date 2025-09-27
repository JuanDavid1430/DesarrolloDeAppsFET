import { Component, Input } from '@angular/core';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'app-page-one',
  template: `
    <ion-content class="ion-padding">
      <h1>Page One</h1>
      <p>This is the first page in the navigation stack.</p>
      <ion-button (click)="navigateToPageTwo()" expand="block">Go to Page Two</ion-button>
    </ion-content>
  `
})
export class PageOneComponent {
  @Input() parentNav?: IonNav;

  constructor(private nav: IonNav) {}

  navigateToPageTwo() {
    // Usar el nav del componente padre si está disponible
    const navToUse = this.parentNav || this.nav;
    // Navegación simple usando el nombre del componente
    navToUse.push('PageTwoComponent');
  }
}