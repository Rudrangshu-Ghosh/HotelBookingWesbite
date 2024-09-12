import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.guard';
import { DisplayService } from 'src/Services/display.service';

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.component.html',
  styleUrls: ['./payment-option.component.css']
})
export class PaymentOptionComponent implements OnInit, CanComponentDeactivate  {


  constructor(public displayService: DisplayService, private router: Router) { }


  ngOnInit(): void {
    // Listen for the browser's popstate event, which is fired on back button
    window.addEventListener('popstate', () => {
      this.isBackNavigation = true;  // Set a flag to detect back navigation
    });
  }

  selectedOption: string = '';
  showPayLaterModal: boolean = false;
  showPayNowModal: boolean = false;

  onContinue(){
    this.closeModal(); // Close any open modal before opening another one

    if (this.selectedOption === 'payLater') {
      this.showPayLaterModal = true;
      this.displayService.paymentOption = this.selectedOption;
    } else if (this.selectedOption === 'payNow') {
      this.showPayNowModal = true;
      this.displayService.paymentOption = this.selectedOption;
    } else {
      alert('Please select a payment option');
    }
  }

  closeModal() {
    this.showPayLaterModal = false;
    this.showPayNowModal = false;
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
