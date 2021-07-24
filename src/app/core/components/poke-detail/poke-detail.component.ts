import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokedexService } from '../../pages/services/pokedex.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {

  pokemon :any;
  habilities:any[]=[];


  constructor(@Inject(MAT_DIALOG_DATA) public data:{poke:any},private pokedexService: PokedexService) {
    this.pokemon = data.poke;
    this.getHabilities();
   }

  ngOnInit(): void {
  }


  getHabilities(){
    this.pokedexService.getHabilities(this.pokemon).subscribe((habilidad)=>{
      // A medida que se obtienes las habilidades, se añaden al arreglo de habiliadades
      this.habilities.push(habilidad);
    });

  }


}
