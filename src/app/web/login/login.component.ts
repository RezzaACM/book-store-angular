import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../shared/services/register.service';
import { Title } from '@angular/platform-browser';
import { FormGroup, Form, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  returnUrl: string
  error = ''

  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.loginControl()

    // set title
    this.titleService.setTitle('Masuk / Login | myBook')

    if (this.gettoken() === null) { //jika token is null
      return //stop here
    } else { // if token there consume api
      this.registerService._verifyToken(this.gettoken())
        .subscribe(
          (res) => {
            this.snackBar.open('Email anda berhasil diverifikasi. Silahkan Login', 'Success!', {
              duration: 5000
              // sdsdsdsd
            })
          }
        );
    }

  }


  loginControl(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
  }

}
