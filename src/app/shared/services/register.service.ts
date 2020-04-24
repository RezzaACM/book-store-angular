import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';
import { Regsiter } from '../models/regsiter';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient,
    private restApi: RestApiService
  ) { }

  _register(data): Observable<Regsiter> {
    return this.http.post<Regsiter>('http://127.0.0.1:8000/api/customer/register', JSON.stringify(data), this.restApi.HttpHeader)
      .pipe(
        retry(1),
        catchError(this.restApi.handleError)
      )
  }

  _verifyToken(data) {
    return this.http.post<any>('http://127.0.0.1:8000/api/customer/verifySuccess/' + data, '', this.restApi.HttpHeader)
      .pipe(
        retry(1),
        catchError(this.restApi.handleError)
      )
  }
}
