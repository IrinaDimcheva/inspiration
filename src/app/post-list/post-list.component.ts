import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../interfaces';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postList: IPost[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.loadPostList().subscribe(postList => {
      this.postList = postList;
    });
  }

}
