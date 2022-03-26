import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title = '';
  content = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  createHandler(form: NgForm) {
    if (form.invalid) { return; }
    // const post: IPost = {
    //   title: form.value.title,
    //   content: form.value.content
    // };
    // this.postService.addPost(post);
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
