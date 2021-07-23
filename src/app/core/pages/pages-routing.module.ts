import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

import { AngularFireAuthGuard,redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PokedexComponent } from './pokedex/pokedex.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path:'pokedex',
    component:PokedexComponent,
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectUnauthorizedToLogin}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
