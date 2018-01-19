import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();

  constructor( private firebase: AngularFireDatabase ) { }

  //------------------------------------------------
  //                     CRUD
  //------------------------------------------------
  // Retrieve All Employees
  getData() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

// Insert New Employee
insertEmployee( employee : Employee) {
  this.employeeList.push({
    name: employee.name,
    position: employee.position,
    office: employee.office,
    salary: employee.salary
  });
}

// Update Employee
updateEmployee( employee: Employee) {
  this.employeeList.update( employee.$key,
    {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
}

// Delete Employee
deleteEmployee( $key: string) {
  this.employeeList.remove($key)
}

}
