import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { MaterialModule } from '../material.module';
import { PostRoutingModule } from './post-routing.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { SharedModule } from '../shared/shared.module';
import { postFeatureKey, postReducer } from './+store/reducers';
import * as postEffects from './+store/effects';

@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    PostListItemComponent,
    PostDetailComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule,
    SharedModule,
    StoreModule.forFeature(postFeatureKey, postReducer),
    EffectsModule.forFeature(postEffects),
  ],
  exports: [PostListComponent, PostCreateComponent, PostListItemComponent],
})
export class PostModule {}
