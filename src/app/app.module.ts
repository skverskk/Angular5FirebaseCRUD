import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular Firebase
import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,
  FirebaseListObservable, 
  FirebaseObjectObservable }
from 'angularfire2/database-deprecated';

import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { EmployeesComponent } from './components/employees/employees.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services
import { EmployeeService } from './services/employee.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SettingsService } from './services/settings.service';


const appRoutes: Routes = [
  { path: '' ,                 component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'dashboard' ,        component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'login',             component: LoginComponent },
  { path: 'register',          component: RegisterComponent },
  { path: 'add-employee',      component: AddEmployeeComponent, canActivate:[AuthGuard] },
  { path: 'employee/:id',      component: EmployeeDetailsComponent, canActivate:[AuthGuard]},
  { path: 'edit-employee/:id', component: EditEmployeeComponent, canActivate:[AuthGuard]},
  { path: 'settings',          component: SettingsComponent, canActivate:[AuthGuard] },
  { path: '**',                component: PageNotFoundComponent }


]


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    DashboardComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
    
    // FormsModule
  ],
  providers: [AngularFireAuth, 
              AngularFireDatabase, 
              EmployeeService, 
              AuthService,
              AuthGuard,
              SettingsService ],

  bootstrap: [AppComponent]
})
export class AppModule { }
