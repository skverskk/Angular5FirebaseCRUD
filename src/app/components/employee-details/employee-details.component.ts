import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/Employee';
import { ToastrService } from 'ngx-toastr';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { RouterState } from '@angular/router/src/router_state';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  id:string;
  employee:Employee;

  constructor( private employeeService:EmployeeService,
               private router:Router,
               private route:ActivatedRoute,
               private toastrService:ToastrService ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    // Get Employee
    this.employeeService.getEmployee(this.id).subscribe( employee => {
      this.employee = employee;
    });
  }
onDeleteClick() {
  if( confirm("Ary you sure ypou wish to delete this employee?")) {
    this.employeeService.deleteEmployee(this.id);
    this.toastrService.success('Success', 'Employee Deleted')
    this.router.navigate(['/']);
  }
}
}
