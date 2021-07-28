import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokedexService } from '../services/pokedex.service';
import { PokeDetailComponent } from '../../components/poke-detail/poke-detail.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../auth/auth.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit,OnDestroy {

  filterType:string[]=[null];
  filterNumberPokedex:number;
  filterName:string="";

  limit:number =10;
  offset:number =0;
  disableButton:boolean=false;

  pokemons: any[]=[];
  pokemon:any[]=[];
  types:any[]=[
    {
      name:'Acero',
      value:'steel'
    },
    {
      name:'Agua',
      value:'water'
    },
    {
      name:'Bicho',
      value:'bug'
    },
    {
      name:'Dragón',
      value:'dragon'
    },
    {
      name:'Eléctrico',
      value:'electric'
    },
    {
      name:'Fantasma',
      value:'ghost'
    },
    {
      name:'Fuego',
      value:'fire'
    },
    {
      name:'Hada',
      value:'fairy'
    },
    {
      name:'Hielo',
      value:'ice'
    },
    {
      name:'Lucha',
      value:'fighting'
    },
    {
      name:'Normal',
      value:'normal'
    },
    {
      name:'Planta',
      value:'grass'
    },
    {
      name:'Psíquico',
      value:'psychic'
    },
    {
      name:'Roca',
      value:'rock'
    },
    {
      name:'Siniestro',
      value:'dark'
    },
    {
      name:'Tierra',
      value:'ground'
    },
    {
      name:'Veneno',
      value:'Poison'
    },
    {
      name:'Volador',
      value:'Flying'
    },
];

  subscriptions = new Subscription();

  @ViewChild('inputFindPokemon',{read:ElementRef,static:true}) num_pokedex:ElementRef;

  constructor(private pokedexService: PokedexService,private matDialog: MatDialog,
              private ngxSpinnerService: NgxSpinnerService,private authService: AuthService) { }

  ngOnInit(): void {
    this.getPokemons();
    this.searchByPokedex();
    document.body.style.backgroundColor="var(--bg-color1)";
  }

  ngOnDestroy(){
    document.body.style.backgroundColor="";
    this.subscriptions.unsubscribe();
  }

  async getPokemons(){
    // Obtener pokemos de 10 en 10
    await this.ngxSpinnerService.show();
    this.pokedexService.getPokemos(this.limit,this.offset).subscribe(async(resp) => {
      this.pokemons=this.pokemons.concat(resp);
      await this.ngxSpinnerService.hide();
    },async (error)=>{
      await this.ngxSpinnerService.hide();
      // Si no se pudo cargar mas pokemons, se resta la paginación
      if(this.limit>10){
        this.limit-=10;
        this.offset-=10;
      }
    });

  }

  getMorePokemos(){
    // Desactiva el boton de cargar mas
    this.disableButton =true;
    // Obtener otros 10 pokemons
    this.limit+=10;
    this.offset+=10;
    this.getPokemons();
  }

  viewDetailPokemon(poke:any){
    // Inspeccionar un pokemon
    this.matDialog.open(PokeDetailComponent,{
      data:{
        poke
      },
      panelClass: ['dialogPokeDetail'],
      maxHeight:'100vw',
      minHeight:'100vh',
      width:'100%',
      height:'100%'
    });
  }

  logOut(){
    this.authService.signOut();
  }

  searchByPokedex(){
    const search$ = fromEvent(this.num_pokedex.nativeElement,'keyup').pipe(
      map((event:any)=>event['target']['value']),
      distinctUntilChanged(),
      debounceTime(300)
    );

    this.subscriptions.add(search$.subscribe((numPokedex)=>{
      if(numPokedex){
        this.getPokemon(numPokedex);
      }else{
        this.pokemon = [];
      }
    }));
  }

  getPokemon(numPokedex){
    this.pokedexService.getPokemon(numPokedex).subscribe((pokemon)=>{
      if(pokemon){
        this.pokemon = [pokemon];
      }
    });
  }
}
