import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectUser } from '../../+store/reducers';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  data$ = combineLatest({
    user: this.store.select(selectUser),
  });

  constructor(private store: Store) {}
}
