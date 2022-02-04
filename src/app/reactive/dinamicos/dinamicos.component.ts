import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
  }


  miFormulario : FormGroup = this.fb.group(
    {
      nombre: [, [Validators.required, Validators.minLength(3)]],
      favoritos : this.fb.array([
        ['Metal Gear', Validators.required],
        ['Final fantasy', Validators.required]
      ], Validators.required)
    }
  );

  nuevoFavorito : FormControl = this.fb.control('', Validators.required);

  campoEsValido(campo : string ) :boolean {
    let retorno = this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;    
    return retorno ? retorno : false;
  }


  guardar(){
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  agregarFavorito(){
    if(this.nuevoFavorito.invalid){
      return;
    }
    console.log(this.nuevoFavorito.value);
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value, Validators.required));
    this.nuevoFavorito.reset();
  }


  borrar(index : number){
    this.favoritosArr.removeAt(index);
  }

}
