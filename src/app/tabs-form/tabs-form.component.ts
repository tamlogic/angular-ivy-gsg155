import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from './person';

@Component({
  selector: 'app-tabs-form',
  templateUrl: './tabs-form.component.html',
  styleUrls: ['./tabs-form.component.css']
})
export class TabsFormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.makeForm();
  }

  get people() {
    return this.form.get('people') as FormArray;
  }

  private allPeople: Person[] = [
    {
      first: 'Bob',
      last: 'Smeeth',
      salary: 100
    },
    {
      first: 'John',
      last: 'Ex',
      salary: 200
    }
  ];

  private makeForm(): FormGroup {
    
    let form = this.fb.group({
      value1: ['some prepopulated data', [Validators.required]],
      value2: ['', [Validators.required]],
      people: this.fb.array([])
    });
    
    this.allPeople.forEach((person, ix) => {
      (form.get('people') as FormArray).push(this.newPerson(person));
    });

    return form;

  }

  private newPerson(person: Person): FormGroup {
    return this.fb.group({
      first: [person.first, Validators.required],
      last: [person.last, Validators.required],
      salary: [person.salary, Validators.required]
    });
  }

}