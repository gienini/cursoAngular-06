import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre : 'TEST',
      precio: 1600,
      existencias : 10
    })
  }

  // miFormulario :FormGroup = new FormGroup(
  //   {
  //     nombre: new FormControl('RTX 4080ti'),
  //     precio: new FormControl(1500),
  //     existencias: new FormControl(0)
  //   }
  // );

  miFormulario : FormGroup = this.fb.group(
    {
      nombre: [, [Validators.required, Validators.minLength(3)]],
      precio: [, [Validators.required, Validators.min(0)]],
      existencias: [, [Validators.required, Validators.min(0)]]
    }
  );



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

}
