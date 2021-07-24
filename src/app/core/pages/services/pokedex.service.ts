import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, of } from 'rxjs';
import { concatMap, map, zip } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.url_poke;

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  getPokemos(limit:number,offset:number){
    return this.http.get<any>(`${base_url}/pokemon/?limit=${limit}&offset=${offset}`).pipe(
      concatMap(({results})=>{
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


}
