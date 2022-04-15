import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { MaterialModule } from '../material.module';
import { PostRoutingModule } from './post-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    PostListItemComponent,
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PostRoutingModule
  ],
  exports: [
    PostListComponent,
    PostCreateComponent,
    PostListItemComponent
  ]
})
export class PostModule { }
