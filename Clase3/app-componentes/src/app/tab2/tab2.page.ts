import { Component, ViewChild } from '@angular/core';
import { IonModal, IonNav } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

// Import para Reorder
interface ReorderEndCustomEvent {
  detail: {
    from: number;
    to: number;
    complete: () => void;
  };
}

// Import para Refresher
interface RefresherCustomEvent {
  target: {
    complete: () => void;
  };
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  @ViewChild('navModal', { static: false }) navModal!: IonModal;
  @ViewChild('nav', { static: false }) nav!: IonNav;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;
  
  // Estado simple para simular navegación
  currentPage = 'page-one';
  navigationStack: string[] = ['page-one'];

  // Progress Bar
  public progress = 0;

  constructor() {
    // Progress Bar animation
    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }

  // Navigation Modal methods - Simulación simple
  onWillPresent() {
    this.currentPage = 'page-one';
    this.navigationStack = ['page-one'];
  }

  closeNavModal() {
    this.navModal.dismiss();
  }

  // Métodos de navegación simulada
  navigateToPage(page: string) {
    this.currentPage = page;
    this.navigationStack.push(page);
  }

  navigateBack() {
    if (this.navigationStack.length > 1) {
      this.navigationStack.pop();
      this.currentPage = this.navigationStack[this.navigationStack.length - 1];
    }
  }

  navigateToRoot() {
    this.currentPage = 'page-one';
    this.navigationStack = ['page-one'];
  }

  getCurrentPageTitle(): string {
    switch (this.currentPage) {
      case 'page-one': return 'Page One';
      case 'page-two': return 'Page Two';
      case 'page-three': return 'Page Three';
      default: return 'Unknown Page';
    }
  }

  // Reorder method
  handleReorderEnd(event: ReorderEndCustomEvent) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group.
    event.detail.complete();
  }

  // Refresher method
  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      console.log('Refresh completed!');
      event.target.complete();
    }, 2000);
  }
}
