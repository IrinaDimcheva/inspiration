import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidatorDirective } from './email-validator.directive';
import { ShortenTitlePipe } from './pipes/shorten-title.pipe';
import { ShortenContentPipe } from './pipes/shorten-content.pipe';
import { ErrorComponent } from './error/error.component';



@NgModule({
  declarations: [
    EmailValidatorDirective,
    ShortenTitlePipe,
    ShortenContentPipe,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmailValidatorDirective,
    ShortenTitlePipe,
    ShortenContentPipe,
  ],
  // entryComponents: [ErrorComponent]
})
export class SharedModule { }
