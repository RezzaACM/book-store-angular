import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from '../../shared/services/register.service';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'ngx-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.scss']
})
export class RequestResetPasswordComponent implements OnInit {

  requestForm: FormGroup;
  loading = false;
  submitted = false;
  userData = {};

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private registerService: RegisterService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    // set title
    this.titleService.setTitle('Reset-Password | myBook');

    // form control
    this.requestControl();
  }

  // button back
  back(): void {
    this.location.back()
  }

  requestControl(): void {
    this.requestForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  get f() {
    return this.requestForm.controls
  }

  onSubmit(): void {
    this.submitted = true
    this.loading = true

    this.userData = {
      email: this.f.email.value
    }

    if (this.requestForm.invalid) {
      this.loading = false
      return
    }

    this.loginService._requestPassword(this.userData)
      .subscribe((res) => {
        this.loading = false
        this.snackBar.open('Reset Password berhasil. Silahkan Cek Email!', 'Success', {
          duration: 5000
        })
        // console.log(res)
      }, (err) => {
        this.loading = false
        this.snackBar.open('Email Tidak Ditemukan!', 'Failed', {
          duration: 5000
        })
      })
  }

}
