import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor( private router : Router,
               private toastrService : ToastrService,
               private authService : AuthService ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login( this.email, this.password)
      .then ((res) => {
        this.toastrService.success('You are Logged In', 'Success');
        this.router.navigate(['/']);
      })
      .catch((err) => { 
        this.toastrService.error(err.message, 'Login Failed');
      })
  }
}
