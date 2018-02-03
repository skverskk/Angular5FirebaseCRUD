import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  NgForm,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  id: string;
  // employee:Employee = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   city: ''
  // }
  employee:Employee;
 

  employeeForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  city: FormControl;

  constructor(
               private employeeService:EmployeeService,
               private router:Router,
               private route:ActivatedRoute,
               private toastrService:ToastrService 
  )                                             { }

  ngOnInit() {
   
  //  this.resetForm();
   this.createFormControls();
   this.createForm();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).subscribe( employee => {
      this.employee = employee;
    // Populate Input Fields from DB
      (<FormGroup>this.employeeForm)
             .setValue(employee, { onlySelf: true });

    }
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
   
/**
 * Cancel any Updates before they're submitted
 */
  cancelUpdate() {
    this.router.navigate(['/employee/'+this.id]);
  }

  /**
   * 
   * @param employeeForm Update Employee
   */
  onSubmit( employeeForm : NgForm ) {
    this.employeeService.updateEmployee(this.id, employeeForm.value);
    this.toastrService.success('Succeeded', 'Employee Update');
  //  this.employeeService.insertEmployee(employeeForm.value);
  // employeeForm.reset();
   this.router.navigate(['/employee/'+this.id]);

 }

}
