import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {SettingsService } from '../../services/settings.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor( private authService: AuthService,
               private toastrService: ToastrService,
               private router: Router,
               private settingsService:SettingsService) { }

  ngOnInit() {
      this.authService.getAuth().subscribe( auth => {
        if( auth ) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
          } else {
            this.isLoggedIn = false;
          }
          this.showRegister = this.settingsService.getSettings().allowRegistration;
      });
  }

  onLogoutClick() {
    this.authService.logout();
    this.toastrService.success( 'Success', 'You are now logged out');
    this.router.navigate(['/login']);
  }
}
