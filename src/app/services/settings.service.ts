import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable()
export class SettingsService {
  settings:Settings = {
    allowRegistration: true
  }
  constructor() { 
    if( localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }
/**
 * Get Settings from local storage
 */
  getSettings() {
    return this.settings;
  }
  
/**
 * Update Settings
 */
  changeSettings( settings:Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
