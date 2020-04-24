import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BookService } from '../../../shared/services/book.service';
import { BooksComponent } from '../books/books.component';
import { Book } from '../../../shared/models/book';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false
  error = ''
  isLoading = false
  userData = {};

  constructor(
    public dialogRef: MatDialogRef<BookAddComponent>,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) { }

  onNoClick(): void {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    this.formControl()
  }

  formControl(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      publisher: ['', Validators.required],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    })

  }

  get f() {
    return this.form.controls
  }

  closeModal(): void {
    let empty = ''
    this.dialogRef.close(empty)
  }

  onSubmit(): void {
    
  }

  doAction(): void {
    this.userData = {
      title: this.f.title.value,
      description: this.f.description.value,
      qty: this.f.qty.value,
      publisher: this.f.publisher.value,
      price: this.f.publisher.value
    }

    // console.log(this.userData)

    this.isSubmitted = true
    // if login not valid stop here
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true
    this.dialogRef.close(this.userData)
  }
}
