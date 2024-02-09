import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPost } from '../../../shared/interfaces';
import { selectUser } from 'src/app/user/+store/reducers';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css'],
})
export class PostListItemComponent {
  @Input() post: IPost;
  get isLogged() {
    return this.store.select(selectUser);
  }
  constructor(private store: Store) {}
}
