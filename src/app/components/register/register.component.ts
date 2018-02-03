import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;

  constructor( private router : Router,
               private toastrService : ToastrService,
               private authService : AuthService ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register( this.email, this.password)
      .then ((res) => {
        this.toastrService.success('You are Registered', 'Success');
        this.router.navigate(['/']);
      })
      .catch((err) => { 
        this.toastrService.error(err.message, 'Registration Failed');
      })
  }
}
