import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { MaterialModule } from '../material.module';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentEditComponent } from './comment-edit/comment-edit.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CommentListComponent,
    CommentCreateComponent,
    CommentEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommentRoutingModule,
    SharedModule
  ]
})
export class CommentModule { }
