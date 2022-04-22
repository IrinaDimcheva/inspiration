import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material.module';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { appInterceptorProvider } from './app.interceptor';
import { errorInterceptorProvider } from './error.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    appInterceptorProvider,
    errorInterceptorProvider
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AboutComponent
  ]
})
export class CoreModule { }
