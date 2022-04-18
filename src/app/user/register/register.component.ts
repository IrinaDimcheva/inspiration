import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { charactersValidator, emailValidator, rePasswordValidator } from '../../shared/validators';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const passwordControl = this.fb.control('', [Validators.required, Validators.minLength(6), charactersValidator]);
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), charactersValidator]],
      email: ['', [Validators.required, emailValidator]],
      password: passwordControl,
      rePassword: ['', [Validators.required, Validators.minLength(6), rePasswordValidator(passwordControl), charactersValidator]]
    });
  }

  registerHandler(): void {
    const data = this.form.value;
    this.isLoading = true;
    this.errorMessage = '';
    this.userService.register(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.isLoading = false;
        console.error(err);
        this.errorMessage = err.error.message;
        // TODO change with modal
        alert(this.errorMessage);
      }
    });
  }
}


// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UserService } from '../../core/services/user.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//   isLoading = false;

//   constructor(private userService: UserService,
//     private router: Router) { }

//   registerHandler(form: NgForm): void {
//     if (form.invalid) { return; }
//     this.isLoading = true;
//     const { username, email, password, rePassword } = form.value;

//     this.userService.register({ username, email, password, rePassword }).subscribe({
//       next: (userData) => {
//         console.log(userData);
//         this.isLoading = false;
//         this.router.navigate(['/']);
//       },
//       error: (err) => {
//         this.isLoading = false;
//         console.error(err);
//         alert(err.error.message);
//       }
//     })
//   }
// }