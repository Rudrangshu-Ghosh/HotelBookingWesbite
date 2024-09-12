import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.guard';
import { DisplayService } from 'src/Services/display.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit, CanComponentDeactivate   {

  fname = '';
  lname = '';
  email = '';

  constructor(public displayService: DisplayService, private router: Router){}
  ngOnInit(): void {
    this.displayService.showNavBar = false;

    // Listen for the browser's popstate event, which is fired on back button
    window.addEventListener('popstate', () => {
      this.isBackNavigation = true;  // Set a flag to detect back navigation
    });
  }

  onSubmit(){
    this.displayService.fullName = this.fname + " " + this.lname;
    this.displayService.currentEmail = this.email;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    $event.returnValue = true; // This triggers the browser's confirmation dialog.
  }

  private isBackNavigation = false;
  canDeactivate(): Observable<boolean> | boolean {
    if (this.isBackNavigation) {
      // If back navigation, prevent navigation
      this.isBackNavigation = false;  // Reset the flag
      alert('Back navigation is disabled.');
      return false;  // Prevent back navigation
    }
    return true;  // Allow other types of navigation
  }

  
}
