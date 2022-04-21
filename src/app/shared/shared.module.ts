import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidatorDirective } from './email-validator.directive';
import { ShortenTitlePipe } from './pipes/shorten-title.pipe';
import { ShortenContentPipe } from './pipes/shorten-content.pipe';



@NgModule({
  declarations: [
    EmailValidatorDirective,
    ShortenTitlePipe,
    ShortenContentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmailValidatorDirective,
    ShortenTitlePipe,
    ShortenContentPipe
  ]
})
export class SharedModule { }
