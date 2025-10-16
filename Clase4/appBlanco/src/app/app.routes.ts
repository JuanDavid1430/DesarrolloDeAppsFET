import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pagina2',
    loadComponent: () => import('./pagina2/pagina2.page').then( m => m.Pagina2Page)
  },
  {
    path: 'ricky',
    loadComponent: () => import('./ricky/ricky.page').then( m => m.RickyPage)
  },
  {
    path: 'personajes-muertos',
    loadComponent: () => import('./personajes-muertos/personajes-muertos.page').then( m => m.PersonajesMuertosPage)
  },
];
