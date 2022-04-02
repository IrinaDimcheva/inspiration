import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.css']
})
export class CommentListItemComponent implements OnInit {
  @Input() comment: IComment;

  constructor() { }

  ngOnInit(): void {
  }

}
