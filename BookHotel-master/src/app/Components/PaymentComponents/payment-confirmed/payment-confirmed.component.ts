import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/can-deactivate.guard';
import { HotelCard } from 'src/Models/HotelCardModel';
import { BookingService } from 'src/Services/booking.service';
import { DisplayService } from 'src/Services/display.service';
import { HotelDetailsService } from 'src/Services/hotel-details.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-payment-confirmed',
  templateUrl: './payment-confirmed.component.html',
  styleUrls: ['./payment-confirmed.component.css']
})
export class PaymentConfirmedComponent implements OnInit, CanComponentDeactivate  {

  constructor(public displayService: DisplayService, private hotelDetailsService: HotelDetailsService, private bookingService: BookingService, private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentHotel();
    this.showAmount();

    this.getUserIdAndSaveBooking();

    // Listen for the browser's popstate event, which is fired on back button
    window.addEventListener('popstate', () => {
      this.isBackNavigation = true;  // Set a flag to detect back navigation
    });
  }

  bookingDate = new Date().toISOString().split('T')[0];

  currentHotel: HotelCard | undefined;

  getCurrentHotel() {
    this.currentHotel = this.hotelDetailsService.hotelcards.find(card => card._id === this.displayService.selectedHotelID);
  }

  showPaid = false;

  showAmount(){
    if (this.displayService.paymentOption === 'payNow') {
      this.showPaid = true;
    }
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

  tempUserID = 0;

  // Store booking details in database
  createBooking() {
    const bookingData = {
      userId: this.tempUserID,
      name: this.displayService.fullName,
      email: this.displayService.currentEmail,
      bookingDate: this.bookingDate,
      hotelId: this.currentHotel?._id,
      checkInDate: this.displayService.checkInDate,
      checkOutDate: this.displayService.checkOutDate,
      numGuests: this.displayService.n_guests,
      numRooms: this.displayService.nRoomsBooked,
      totalAmount: this.displayService.amount,
      paymentStatus: this.showPaid ? 'Confirmed': 'Pending'
    };
    
    this.bookingService.createBooking(bookingData).subscribe((response) => {
      console.log('Booking created:', response);
    });
  }

  getUserIdAndSaveBooking() {
    this.userService.getUserByMobile(this.displayService.currentPhone).subscribe((user) => {
      this.tempUserID = user._id;
      this.createBooking();
    });
  }
  
}
