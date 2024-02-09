import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { authActions } from '../../+store/actions';
import { selectErrors, selectIsSubmitting } from '../../+store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('f') form: NgForm;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    errors: this.store.select(selectErrors),
  });

  constructor(private store: Store) {}

  loginHandler(): void {
    if (this.form.invalid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.store.dispatch(authActions.login({ request: { email, password } }));
  }
}
