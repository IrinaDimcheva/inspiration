import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') form: NgForm;
  isLoading = false;

  constructor(private userService: UserService, private router: Router) { }

  loginHandler(): void {
    if (this.form.invalid) { return; }
    this.isLoading = true;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.userService.login({ email, password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
