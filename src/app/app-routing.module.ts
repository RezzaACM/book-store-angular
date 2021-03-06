import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { patch } from '@nebular/theme';
import { RegisterComponent } from './web/register/register.component';
import { LoginComponent } from './web/login/login.component';
import { RequestResetPasswordComponent } from './web/request-reset-password/request-reset-password.component';
import { SetNewPasswordComponent } from './web/set-new-password/set-new-password.component';
import { IndexComponent } from './web/index/index.component';


export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login/:token',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'reset-password/new',
    component: RequestResetPasswordComponent
  },
  {
    path: 'reset-password/reset/:token',
    component: SetNewPasswordComponent
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: '/  ', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
