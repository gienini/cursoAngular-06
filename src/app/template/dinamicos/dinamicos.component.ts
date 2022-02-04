import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre : string
  favoritos: Favorito[]
}
interface Favorito{
  id:number,
  nombre:string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  @ViewChild('miFormulario') miFormulario !: NgForm;

  constructor() { }

  ngOnInit(): void {
  }


  guardar(){
    console.log(this.miFormulario);
  }


  nuevoJuego : string='';
  persona : Persona = {
    nombre: 'Fran',
    favoritos: [
      { id:1, nombre: 'Final fantasy VII'},
      { id:2, nombre: 'Metal gear'}
    ]
  }


  eliminar (index : Favorito){
    console.log('eliminar '+index);
    this.persona.favoritos.splice(this.persona.favoritos.indexOf(index), 1);
  }


  agregarJuego(){
    const nuevoFavorito : Favorito = {
      id: Math.floor(Date.now() / 1000),
      nombre: this.nuevoJuego
    }
    this.persona.favoritos.push({...nuevoFavorito});
    this.nuevoJuego = '';

  }

}
