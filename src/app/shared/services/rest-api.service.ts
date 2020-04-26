import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor() { }

  public HttpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ` + btoa('admin:admin')
    })
  }

  // Api
  public _api = "http://127.0.0.1:8000/api/";

  // error handler
  public handleError(error: HttpErrorResponse) {
    console.log(error.message)
    return throwError(error.message)
  }

}