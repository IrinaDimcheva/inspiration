import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { PostListComponent } from './components/post-list/post-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { MaterialModule } from '../material.module';
import { PostsRoutingModule } from './posts-routing.module';
import { SharedModule } from '../shared/shared.module';
import { postsFeatureKey, postsReducer } from './+store/reducers';
import * as postsEffect from './+store/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostListComponent, PostListItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PostsRoutingModule,
    SharedModule,
    StoreModule.forFeature(postsFeatureKey, postsReducer),
    EffectsModule.forFeature(postsEffect),
  ],
  exports: [PostListComponent, PostListItemComponent],
})
export class PostsModule {}
