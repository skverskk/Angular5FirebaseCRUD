import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;

  constructor( private router:Router,
               private toastrService:ToastrService,
               private settingsService:SettingsService ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }
  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.toastrService.success('Success', 'Settings Updated');
    this.router.navigate(['/settings']);

  }
}
