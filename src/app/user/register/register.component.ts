import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading = false;

  constructor(private userService: UserService,
    private router: Router) { }

  registerHandler(form: NgForm): void {
    if (form.invalid) { return; }
    this.isLoading = true;
    const { username, email, password, rePassword } = form.value;

    this.userService.register({ username, email, password, rePassword }).subscribe({
      next: (userData) => {
        console.log(userData);
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert(err.error.message);
      }
    })
  }
}


// export class RegisterComponent implements OnInit {
//   form: FormGroup;

//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(4)]],
//       email: ['', [Validators.required, Validators.pattern('^[a-zA-z\.-_]{4,}@[a-z]{2,4}\.[a-z]{2,4}$')]],
//       password: ['', Validators.required, Validators.minLength(6)],
//       rePassword: ['', Validators.required]
//     });
//   }
// }
