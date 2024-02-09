import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import {
  charactersValidator,
  emailValidator,
  rePasswordValidator,
} from '../../../shared/validators';
import { selectErrors, selectIsSubmitting } from '../../+store/reducers';
import { IRegisterRequest } from '../../interfaces/register-request';
import { authActions } from '../../+store/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: UntypedFormGroup;
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    errors: this.store.select(selectErrors),
  });

  constructor(private fb: UntypedFormBuilder, private store: Store) {}

  ngOnInit(): void {
    const passwordControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(35),
      charactersValidator,
    ]);
    this.form = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
          charactersValidator,
        ],
      ],
      email: ['', [Validators.required, emailValidator]],
      password: passwordControl,
      rePassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(35),
          rePasswordValidator(passwordControl),
          charactersValidator,
        ],
      ],
    });
  }

  registerHandler(): void {
    const request: IRegisterRequest = this.form.value;
    this.store.dispatch(authActions.register({ request }));
  }
}
