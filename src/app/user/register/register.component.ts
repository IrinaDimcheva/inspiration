import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { charactersValidator, emailValidator, rePasswordValidator } from '../../shared/validators';
import { mimeType } from '../../shared/mime-type.validator';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  imagePreview: string;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const passwordControl = this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(35), charactersValidator]);
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25), charactersValidator]],
      email: ['', [Validators.required, emailValidator]],
      image: [null, [], [mimeType]],
      password: passwordControl,
      rePassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(35), rePasswordValidator(passwordControl), charactersValidator]]
    });
  }

  imagePickHandler(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  registerHandler(): void {
    const data = this.form.value;
    this.isLoading = true;
    this.userService.register(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: err => {
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}
