import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostListComponent } from './components/post-list/post-list.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { MaterialModule } from '../material.module';
import { PostRoutingModule } from './post-routing.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { SharedModule } from '../shared/shared.module';

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
  ],
  exports: [PostListComponent, PostCreateComponent, PostListItemComponent],
})
export class PostModule {}
