import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-widget-dialog',
  templateUrl: './add-widget-dialog.component.html',
  styleUrls: ['./add-widget-dialog.component.css']
})
export class AddWidgetDialogComponent implements OnInit {

  widgetForm: FormGroup = this.buildForm();

  constructor(public dialogRef: MatDialogRef<AddWidgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {}

  ngOnInit() {
  }

  submitForm() {
    this.dialogRef.close(this.widgetForm.value);
  }

  resetForm() {
    this.widgetForm = null;

    setTimeout(() => {
      this.widgetForm = this.buildForm();
    }, 300);
  }


  private buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

}