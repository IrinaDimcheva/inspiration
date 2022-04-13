import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') form: NgForm;
  errorMessage = '';
  isLoading = false;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loginHandler(): void {
    if (this.form.invalid) { return; }
    this.errorMessage = '';
    this.isLoading = true;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.userService.login({ email, password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.errorMessage = 'ERROR!'
      }
    });
  }
}
