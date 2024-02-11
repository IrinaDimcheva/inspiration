import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostModule } from './post/post.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import * as authEffects from './user/+store/effects';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    PostModule,
    StoreModule.forRoot({}),
    // StoreModule.forRoot({ router: routerReducer }),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    EffectsModule.forRoot(authEffects),
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
