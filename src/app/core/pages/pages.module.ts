import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    PagesComponent,
    PokedexComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
