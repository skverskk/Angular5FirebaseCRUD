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
import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
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
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee:Employee = {
    firstName: '',
    lastName: '',
    email: '',
    city: ''
  }

  employeeForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  city: FormControl;
 


  constructor(private employeeService: EmployeeService,
              private toastr : ToastrService,
              private router : Router ) { }

  ngOnInit() {
    this.resetForm();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.firstName = new FormControl('',
        [Validators.required,
         Validators.minLength(3)
      ]);
    this.lastName = new FormControl('',
      [Validators.required,
      Validators.minLength(3)
      ]);
    this.email = new FormControl('', Validators.required);
    this.city = new FormControl('',
      [Validators.required
  //      salaryValidator
        //  Validators.pattern("/^\d{9}$/")
      ]);
  };

  createForm() {
    this.employeeForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      city: this.city
    });
  }
  /** Submit form to Firebase DB */
  onSubmit( employeeForm : NgForm ) {
    
    this.employeeService.addEmployee(employeeForm.value);
  //  this.employeeService.insertEmployee(employeeForm.value);
   this.resetForm();
  // employeeForm.reset();
   this.toastr.success('Submitted Successfully', 'Employee Registration');
   this.router.navigate(['/']);

 }

 /** Clears all input fields */ 
 resetForm(employeeForm?) {
    if (employeeForm != null)
      employeeForm.reset();
  }
}
