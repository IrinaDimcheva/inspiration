import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../material.module';
import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { PostModule } from '../post/post.module';
import { SharedModule } from '../shared/shared.module';
import { FavoritesComponent } from './components/favorites/favorites.component';
import * as authEffects from './+store/effects';
import { authFeatureKey, authReducer } from './+store/reducers';
import { PostsModule } from '../posts/posts.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FavoritesComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    PostModule,
    PostsModule,
    SharedModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature(authEffects),
  ],
})
export class UserModule {}
