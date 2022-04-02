import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list/comment-list.component';
import { MaterialModule } from '../material.module';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentService } from './comment.service';
import { CommentCreateComponent } from './comment-create/comment-create.component';
import { FormsModule } from '@angular/forms';
import { CommentListItemComponent } from './comment-list-item/comment-list-item.component';



@NgModule({
  declarations: [
    CommentListComponent,
    CommentCreateComponent,
    CommentListItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CommentRoutingModule
  ],
  providers: [
    CommentService
  ]
})
export class CommentModule { }
