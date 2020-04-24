import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../../shared/models/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  local_data: any
  form: FormGroup;
  isSubmitted = false
  error = ''
  isLoading = false
  userData = {};
  id: number

  constructor(
    private dialogRef: MatDialogRef<BookEditComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Book
  ) { }

  ngOnInit(): void {
    this.local_data = { ...this.data }
    this.formControl()
  }

  formControl(): void {
    this.form = this.formBuilder.group({
      title: [`${this.local_data.title}`, Validators.required],
      publisher: [`${this.local_data.publisher}`, Validators.required],
      qty: [`${this.local_data.qty}`, Validators.required],
      description: [`${this.local_data.description}`, Validators.required],
    })

  }

  get f() {
    return this.form.controls
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {

  }

  doAction(): void {
    this.userData = {
      title: this.f.title.value,
      description: this.f.description.value,
      qty: this.f.qty.value,
      publisher: this.f.publisher.value
    }

    this.isSubmitted = true
    // if login not valid stop here
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true
    this.dialogRef.close(this.userData)
  }

}
