import { Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ConsumoHttpComponent } from './consumo-http/consumo-http.component';
import { TiendaComponent } from './tienda/tienda.component';

export const routes: Routes = [
  { path: '', redirectTo: '/first', pathMatch: 'full' },
  { path: 'first', component: FirstComponent },
  { path: 'second', component: SecondComponent },
  { path: 'consumo-http', component: ConsumoHttpComponent },
  { path: 'tienda', component: TiendaComponent }
];
