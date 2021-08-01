import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeDetailComponent } from './poke-detail/poke-detail.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [PokeDetailComponent, HeaderComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[PokeDetailComponent,HeaderComponent]
})
export class ComponentsModule { }
