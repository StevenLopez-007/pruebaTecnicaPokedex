import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PagesComponent } from './pages.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { PipesPokeModule } from './pipes/pipes-poke.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesComponent,
    PokedexComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    AngularMaterialModule,
    PipesPokeModule
  ]
})
export class PagesModule { }
