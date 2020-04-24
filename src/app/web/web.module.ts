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
        HeaderLogoComponent
    ],
    exports: [
        PhoneMaskDirective
    ]
})
export class WebModule { }