import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { IPost } from 'src/app/shared/interfaces';
import { Store } from '@ngrx/store';
import { authActions } from '../../+store/actions';
import {
  selectErrors,
  selectFavoritesData,
  selectIsLoading,
} from '../../+store/reducers';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteList$: Observable<IPost[]>;
  data$ = combineLatest({
    favoriteList: this.store.select(selectFavoritesData),
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectErrors),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.getFavorites());
  }
}
