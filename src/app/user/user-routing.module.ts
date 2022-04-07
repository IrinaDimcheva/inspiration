import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
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
          isLogged: false,
          title: 'Inspiration | Login'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          isLogged: false,
          title: 'Inspiration | Register'
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          isLogged: true,
          title: 'Inspiration | User'
        }
      }
    ]
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);