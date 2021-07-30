import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPokemons'
})
export class FilterPokemonsPipe implements PipeTransform {

  transform(pokemons:any[],type:string[]=[]) {
    return pokemons.filter((poke)=>type[0]?poke.types.some(poke=>poke.type.name ==type):true);
  }

}
