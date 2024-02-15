import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidatorDirective } from './email-validator.directive';
import { ShortenTitlePipe } from './pipes/shorten-title.pipe';
import { ShortenContentPipe } from './pipes/shorten-content.pipe';
import { ErrorComponent } from './components/error/error.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmailValidatorDirective,
    ShortenTitlePipe,
    ShortenContentPipe,
    ErrorComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [EmailValidatorDirective, ShortenTitlePipe, ShortenContentPipe],
  // entryComponents: [ErrorComponent]
})
export class SharedModule {}
