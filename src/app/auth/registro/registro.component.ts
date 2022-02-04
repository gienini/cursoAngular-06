import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ValidatorService } from '../../shared/validator/validator.service';
import { EmailValidatorService } from '../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  constructor(private fb : FormBuilder, private validatorService : ValidatorService, private emailValidator : EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Fran Gienini',
      email: 'fran@fran.com',
      username: 'fran2',
      password : '123456',
      password2 : '123456'
    });
  };

  miFormulario : FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]],
    email: ['',[Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username: ['',[Validators.required, this.validatorService.noPuedeSerFran]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]],
  }, {
    validators : [ this.validatorService.camposIguales('password', 'password2')]
  });


  campoNoValido(campo : string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.reset({
      nombre: 'Fran Gienini',
      email: 'fran@fran.com',
      username: 'fran'
    });
    this.miFormulario.markAsTouched();
  }


  get emailErrorMsg(){
    const errors = this.miFormulario.get('email')?.errors;
    let retorno = '';
    if (errors?.['required']){
      retorno = 'El correo es obligatorio'
    }
    if (errors?.['pattern']){
      retorno = 'El correo no tiene el formato correcto'
    }
    if (errors?.['emailTomado']){
      retorno = 'El correo ya esta en uso'
    }
    return retorno;
  }
 

  // emailRequired(){
  //   const campo = 'email';
  //   return this.miFormulario.get(campo)?.errors?.['required'] && this.miFormulario.get(campo)?.touched;
  // }

  // emailFormato(){
  //   const campo = 'email';
  //   return this.miFormulario.get(campo)?.errors?.['pattern'] && this.miFormulario.get(campo)?.touched;
  // }

  // emailTomado(){
  //   const campo = 'email';
  //   return this.miFormulario.get(campo)?.errors?.['emailTomado'] && this.miFormulario.get(campo)?.touched;
  // }
}
