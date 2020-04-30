import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule } from '@nebular/theme';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PhoneMaskDirective } from '../shared/helper/phone-mask.directive';
import { LoginComponent } from './login/login.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { WebRoutingModule } from './web-routing.module';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { BoxShadowComponent } from './components/box-shadow/box-shadow.component';
import { IndexComponent } from './index/index.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NbLayoutModule,
        MatSnackBarModule,
        WebRoutingModule
    ],
    declarations: [
        RegisterComponent,
        PhoneMaskDirective,
        LoginComponent,
        HeaderLogoComponent,
        RequestResetPasswordComponent,
        SetNewPasswordComponent,
        BoxShadowComponent,
        IndexComponent
    ],
    exports: [
        PhoneMaskDirective
    ]
})
export class WebModule { }