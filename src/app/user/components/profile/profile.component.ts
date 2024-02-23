import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectErrors,
  selectIsLoading,
  selectUser,
} from '../../+store/reducers';
import { authActions } from '../../+store/actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data$ = combineLatest({
    user: this.store.select(selectUser),
    isLoading: this.store.select(selectIsLoading),
    errors: this.store.select(selectErrors),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.getUser());
  }
}
