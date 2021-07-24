import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPokemons'
})
export class FilterPokemonsPipe implements PipeTransform {

  transform(pokemons:any[],type:string[]=[],pokedex:number,name:string="") {
    return pokemons.filter((poke)=>type[0]?poke.types.some(poke=>poke.type.name ==type):true)
    .filter(poke=>pokedex?poke.id==pokedex:true)
    .filter(poke=>name.length>0?poke.name.toLowerCase().trim().includes(name.toLowerCase().trim()):true);
  }

}
