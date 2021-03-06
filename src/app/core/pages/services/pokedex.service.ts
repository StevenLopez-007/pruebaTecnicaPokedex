import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, of } from 'rxjs';
import { concatMap, map, switchMap, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.url_poke;

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  // Obtenemos un listado con las url para obtener los detalles de cada pokemon, con concatMap y forkJoin
  // vamos realizando las peticiones a esas url, al final se devuelve un solo arreglo con las informacion de todos los pokemones
  getPokemos(limit:number,offset:number){
    return this.http.get<any>(`${base_url}/pokemon/?limit=${limit}&offset=${offset}`).pipe(
      switchMap(({results})=>{
        return forkJoin(results.map(item=>this.getPokemonDetail(item.url)))
      })
    )
  }

  getPokemonDetail(pokemon:any){
    return this.http.get(pokemon);
  }

  getHabilities(pokemon:any){
    if(pokemon.abilities.length>0){
      return from(pokemon.abilities).pipe(
        concatMap((hab:any)=>{
          return this.http.get(hab.ability.url)
        }),
        map((resp:any)=>resp.flavor_text_entries),
        map((resp:any)=>{
          return resp.filter((hab:any)=>hab.language.name=='es');
        }),
        map((resp:any[])=>resp[0])
      )
    }
    return of([])
  }

  getPokemon(poke:any){
    return this.http.get(`${base_url}/pokemon/${poke}`);
  }


}
