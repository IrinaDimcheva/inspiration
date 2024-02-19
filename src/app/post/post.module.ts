import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostCreateComponent } from './components/post-create/post-create.component';
import { MaterialModule } from '../material.module';
import { PostRoutingModule } from './post-routing.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { SharedModule } from '../shared/shared.module';
import { postFeatureKey, postReducer } from './+store/reducers';
import * as postEffect from './+store/effects';

@NgModule({
  declarations: [PostCreateComponent, PostDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    SharedModule,
    StoreModule.forFeature(postFeatureKey, postReducer),
    EffectsModule.forFeature(postEffect),
  ],
  exports: [PostCreateComponent],
})
export class PostModule {}
