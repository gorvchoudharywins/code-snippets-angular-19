import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  //Set Validations
  getValidations(validations: any) {
    let arr = [];

    for (let validation of Object.keys(validations || {})) {
      if (!validations[validation])
        continue;

      (validation == 'required') ? arr.push(Validators.required) : '';
    }
    return arr;
  }


  //Validation Error Message
  checkErrors(control: any, name: string) {
    let errorMessage = control?.hasError('required') ? `${name} is Required*` : '';

    return errorMessage;
  }
}
