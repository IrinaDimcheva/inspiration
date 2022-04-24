import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function charactersValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) { return null; }
  const isValidInput = /^[a-zA-Z0-9]+$/.test(value);
  return isValidInput ? null : { charactersValidator: true };
}

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) { return null; }
  const isValidEmail = /^[A-Za-z0-9_\.-]{4,}@[a-z]{2,5}\.[a-z]{2,4}/.test(value);
  return isValidEmail ? null : { emailValidator: true };
}

export function rePasswordValidator(passwordControl: AbstractControl): ValidatorFn {
  const validatorFn: ValidatorFn = (rePasswordControl: AbstractControl) => {
    if (passwordControl.value !== rePasswordControl.value) {
      return { rePasswordValidator: true };
    }
    return null;
  }
  return validatorFn;
}