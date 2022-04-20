import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AuthGuard],
    component: LoginComponent,
    data: {
      title: 'Inspiration | Login',
      isLogged: false
    }
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    component: RegisterComponent,
    data: {
      title: 'Inspiration | Register',
      isLogged: false
    }
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
    data: {
      isLogged: true,
      title: 'Inspiration | User'
    }
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);