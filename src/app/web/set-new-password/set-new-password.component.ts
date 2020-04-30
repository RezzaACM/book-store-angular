import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../shared/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../../shared/helper/must-match.validator';
import { first } from 'rxjs/operators';

interface IUsers {
  email: string;
}

@Component({
  selector: 'ngx-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {

  users = [];
  submitted = false;
  loading = false;
  resetForm: FormGroup


  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private loginService: LoginService,
    private formBulider: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.formControl()

    // get token
    let token = this.getToken();
    // if token success
    this.loginService._verifyTokenPass(token)
      .subscribe((res) => {
        this.snackBar.open('Silahkan Masukkan Password Baru', 'Success', {
          duration: 5000
        })
        this.users.push(res['data'][0]['email'])
        this.users.toString()
      }, err => { //if token not found!
        this.snackBar.open('Token tidak terdaftar!', 'Failed', {
          duration: 5000
        })
      })

  }

  formControl() {
    this.resetForm = this.formBulider.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPass')
    })
  }

  get f() {
    return this.resetForm.controls
  }


  getToken() {
    return this.route.snapshot.paramMap.get('token');
  }


  userData = {}
  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    this.userData = {
      email: this.users.toLocaleString(),
      token: this.getToken(),
      password: this.f.password.value
    }

    if (this.resetForm.invalid) {
      this.loading = false;
      return
    }

    this.loginService._resetPassword(this.userData)
      .pipe(first())
      .subscribe(
        res => {
          this.snackBar.open('Password berhasil diperbarui. Silahkan login', 'Success', {
            duration: 3000
          })
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/login'])
          }, 3000)
        }
      )
  }


}
