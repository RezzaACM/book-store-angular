import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../shared/services/register.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../shared/services/login.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token;
  loginForm: FormGroup
  loading = false
  submitted = false
  userData = {}

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private registerService: RegisterService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {

    this.loginControl()

    // set title
    this.titleService.setTitle('Masuk / Login | myBook')

    if (this.gettoken() === null) { //jika token is null
      return //stop here
    }
    else if (this.gettoken() === '#success') {
      this.snackBar.open('Registrasi Berhasil. Silahkan Cek Email untuk verifikasi!', 'Success!', {
        duration: 5000
      })
    }
    else if (this.gettoken()) { // if token there consume api
      this.registerService._verifyToken(this.gettoken())
        .subscribe(
          (res) => {
            if (res['message'] === 'Youre e-mail has been verify') {
              this.snackBar.open('Email sudah terverifikasi!', 'Warning!', {
                duration: 5000
              })

            } else {
              this.snackBar.open('Email anda berhasil diverifikasi. Silahkan Login', 'Success!', {
                duration: 5000
              })
            }
          },
          error => {
            this.snackBar.open('Token tidak terdaftar', 'Error!', {
              duration: 5000
            })
          }
        );
    }

  }


  loginControl(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: ['']
    })
  }

  gettoken() {
    return this.route.snapshot.paramMap.get('token')
  }

  get f() {
    return this.loginForm.controls
  }


  onSubmit(): void {
    this.submitted = true
    this.loading = true

    this.userData = {
      email: this.f.email.value,
      password: this.f.password.value
    }

    if (this.loginForm.invalid) {
      this.loading = false
      return
    }

    this.loginService._login(this.userData)
      .pipe(first())
      .subscribe((res) => {
        this.loading = false
        console.log(res)
      }, (err) => {
        this.loading = false
      })

  }

}
