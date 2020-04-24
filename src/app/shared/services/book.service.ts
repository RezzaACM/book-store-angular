import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from './rest-api.service';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient,
    private restApi: RestApiService
  ) { }

  _getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.restApi._api + 'books', this.restApi.HttpHeader)
      .pipe(
        retry(1),
        catchError(this.restApi.handleError)
      )
  }

  _deleteBook(data): Observable<Book> {
    return this.http.post<Book>(this.restApi._api + 'book/delete', JSON.stringify(data), this.restApi.HttpHeader)
      .pipe(
        retry(1),
        catchError(this.restApi.handleError)
      )
  }

  _insertBook(data): Observable<Book> {
    return this.http.post<Book>(this.restApi._api + 'book/store', JSON.stringify(data), this.restApi.HttpHeader)
      .pipe(
        retry(1),
        catchError(this.restApi.handleError)
      )
  }

  _updateBook(data, id): Observable<Book> {
    return this.http.post<Book>(`${this.restApi._api}book/update/${id}`, JSON.stringify(data), this.restApi.HttpHeader)
      .pipe(
        retry(1),
        catchError(this.restApi.handleError)
      )
  }

}
