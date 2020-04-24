import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookManagementComponent } from './book-management.component';
import { BooksComponent } from './books/books.component';
import { BookAddComponent } from './book-add/book-add.component';


const routes: Routes = [
  {
    path: '',
    component: BookManagementComponent,
    children: [
      {
        path: 'books',
        component: BooksComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookManagementRoutingModule { }
