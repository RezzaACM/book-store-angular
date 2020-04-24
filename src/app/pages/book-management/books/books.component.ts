import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from '../../../shared/services/book.service';
import { Book } from '../../../shared/models/book';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { BookAddComponent } from '../book-add/book-add.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isUndefined } from 'util';
import { BookEditComponent } from '../book-edit/book-edit.component';


@Component({
  selector: 'ngx-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  book: any = []
  userdata = {}
  returnUrl: string


  displayedColumns: string[] = ['#', 'title', 'description', 'publisher', 'qty', 'price', 'update', 'delete'];
  dataSource = new MatTableDataSource<Book>();


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.displayData()
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pages/book-management/books';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public displayData(): void {
    this.bookService._getBooks()
      .subscribe(res => {
        this.dataSource.data = res['data'],
          this.book = res
      })
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  delete(id): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.deleteBookAct(id)
      }
    })
  }

  deleteBookAct(idValue): void {
    this.userdata = {
      id: idValue
    }
    this.bookService._deleteBook(this.userdata)
      .subscribe(() => {
        this.displayData()
      })
  }

  updateModal(element): void {
    // console.table({ element })
    const dialogRef = this.dialog.open(BookEditComponent, {
      width: '50%',
      data: element
    });

    dialogRef.afterClosed().subscribe((result) => {
      let undefinedd = undefined
      if (result == undefinedd) {
        return
      }
      if (result == false) {
        return
      }
      this.bookService._updateBook(result, element.id).subscribe(() => {
        this.displayData()
        this.snackBar.open('Update data has been', 'Success', {
          duration: 2000,
        })
      })
    })
  }

  create(): void {
    const dialogRef = this.dialog.open(BookAddComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      let undefinedd = undefined
      if (result == undefinedd) {
        return false
      }
      if (result == '') {
        return false
      }
      this.bookService._insertBook(result).subscribe(() => {
        this.displayData()
        this.snackBar.open('Inset data has been', 'Success', {
          duration: 2000,
        })
      })
    })


  }

}
