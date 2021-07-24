import { NgModule } from '@angular/core';
import { FilterPokemonsPipe } from './filter-pokemons.pipe';



@NgModule({
  declarations: [FilterPokemonsPipe],
  imports: [],
  exports:[FilterPokemonsPipe]
})
export class PipesPokeModule { }
