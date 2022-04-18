import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidatorDirective } from './email-validator.directive';



@NgModule({
  declarations: [
    EmailValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmailValidatorDirective
  ]
})
export class SharedModule { }
