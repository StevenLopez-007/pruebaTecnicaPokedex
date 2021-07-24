import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokeDetailComponent } from './poke-detail/poke-detail.component';
import { AngularMaterialModule } from '../../angular-material.module';



@NgModule({
  declarations: [PokeDetailComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[PokeDetailComponent]
})
export class ComponentsModule { }
