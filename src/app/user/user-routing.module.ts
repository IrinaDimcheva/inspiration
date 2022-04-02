import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'user',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          isAuth: false,
          title: 'Inspiration | Login'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          isAuth: false,
          title: 'Inspiration | Register'
        }
      }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);