import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  NgForm,
  Validators
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { EmployeeService } from '../shared/employee.service';
import { ToastrService } from 'ngx-toastr';

/**
 * function salaryValidator()
 * Validates the salary field to check for a positive
 * numeric value
 * Returns:  null if true or salaryValidator object, if false
 * Pass the actual control object i.e. salary
 * @param control 
 */
function salaryValidator(control: FormControl) {
  let salary = control.value;
  return Number(salary) && salary > 0 ? null : {
    salaryValidator: {
      valid: false
    }
  };
}

function noWhitespaceValidator(control: FormControl) {
  let isWhitespace = (control.value || '').trim().length === 0;
  let isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true }
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  fname: FormControl;
  lname: FormControl;
  position: FormControl;
  office: FormControl;
  salary: FormControl;


  constructor(private employeeService: EmployeeService,
              private toastr : ToastrService ) { }

  ngOnInit() {
    this.resetForm();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.fname = new FormControl('',
      [
      Validators.minLength(2),
      noWhitespaceValidator
      ]);
    this.lname = new FormControl('',
      [Validators.required,
      Validators.minLength(3)
      ]);
    this.position = new FormControl('', Validators.required);
    this.office = new FormControl('', Validators.required);
    this.salary = new FormControl('',
      [Validators.required,
        salaryValidator
        //  Validators.pattern("/^\d{9}$/")
      ]);
  };

  createForm() {
    this.employeeForm = new FormGroup({
      name: new FormGroup({
        fname: this.fname,
        lname: this.lname
      }),
      position: this.position,
      office: this.office,
      salary: this.salary
    });
  }
  /** Submit form to Firebase DB */
  onSubmit( employeeForm : NgForm ) {
    this.employeeService.insertEmployee(employeeForm.value);
   // this.resetForm();
   employeeForm.reset();
    this.toastr.success('Submitted Successfully', 'Employee Registration');
 }

 /** Clears all input fields */ 
 resetForm(employeeForm?) {
    if (employeeForm != null)
      employeeForm.reset();
  }
}
