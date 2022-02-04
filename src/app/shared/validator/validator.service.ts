import { Injectable } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  noPuedeSerFran(control : FormControl){
    const valor = control.value.trim().toLowerCase();
    if (valor === 'fran'){
      return {noFran : true}
    }
    return null;
  }

  public nombreApellidoPattern : string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  camposIguales (campo1 : string, campo2 : string) {
    return (control : AbstractControl) : ValidationErrors | null=>{
      const pass1= control.get(campo1)?.value;
      const pass2= control.get(campo2)?.value;

      if (pass1 !== pass2){
        control.get(campo2)?.setErrors({noIguales : true});
        return {noIguales : true}
      }
      control.get(campo2)?.setErrors(null);
      return null;
    }
  }
}
