import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/user/services/user.service';
import { IPost } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favoriteList$: Observable<IPost[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.favoriteList$ = this.userService.getFavorites().pipe(shareReplay(1));
  }
}
