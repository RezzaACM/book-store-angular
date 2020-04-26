import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../shared/helper/must-match.validator';
import { RegisterService } from '../../shared/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false
  loading = false;
  userData = {};

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formControl();
  }

  formControl(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPass')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    // set input
    this.userData = {
      name: this.f.fullName.value,
      email: this.f.email.value,
      phone_number: this.f.phone.value,
      password: this.f.password.value
    }

    this.loading = true;
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }

    this.registerService._register(this.userData)
      .pipe(first())
      .subscribe(res => {
        let errorEmail = res['message']
        if (errorEmail === "Email has been using.") {
          this.loading = false
          this.snackBar.open(errorEmail, 'Warning', {
            duration: 5000
          })
        }
        if (errorEmail === "Success! New Customer Has Been Created") {
          this.loading = false
          this.router.navigate(['/login', "#success"]);
        }
      })

  }

}