import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from './rest-api.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private resApi: RestApiService
  ) { }

  _login(data) {
    return this.http.post<any>(this.resApi._api + 'customer/auth', JSON.stringify(data), this.resApi.HttpHeader)
      .pipe(
        retry(2),
        catchError(this.resApi.handleError)
      )
  }
}
