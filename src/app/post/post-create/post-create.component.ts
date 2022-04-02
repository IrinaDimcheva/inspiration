import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { IPost } from '../../shared/interfaces';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  // title = '';
  // content = '';
  // imageUrl = '';

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  createHandler(form: NgForm) {
    if (form.invalid) { return; }
    const post: any = {
      title: form.value.title,
      content: form.value.content,
      imageUrl: form.value.imageUrl
    };
    // this.postService.addPost(post);
    this.postService.addPost(post).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      }
    });
    form.resetForm();
  }
}
