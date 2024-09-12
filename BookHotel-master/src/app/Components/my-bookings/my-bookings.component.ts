import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/Models/BookingModel';
import { BookingService } from 'src/Services/booking.service';
import { DisplayService } from 'src/Services/display.service';
import { HotelDetailsService } from 'src/Services/hotel-details.service';
import { UserService } from 'src/Services/user.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {


  bookings: Booking[] = [];
  tempUserId = 0;  // Set this dynamically, from logged-in user data

  constructor(private bookingService: BookingService, private userService: UserService, public displayService: DisplayService, private hotelDetailsService: HotelDetailsService) { }

  ngOnInit(): void {
    this.getUserIdAndBookings();
  }

  getUserBookings() {
    this.bookingService.getUserBookings(this.tempUserId).subscribe((data) => {
      this.bookings = data;

      // Now call getHotelDetails after bookings are populated
      this.getHotelDetails();
    });
  }

  getUserIdAndBookings() {
    this.userService.getUserByMobile(this.displayService.currentPhone).subscribe((user) => {
      this.tempUserId = user._id;
      this.getUserBookings();
    });
  }

  getHotelDetails(): void {
    for (let index = 0; index < this.bookings.length; index++) {
      this.hotelDetailsService.getHotelById(this.bookings[index].hotelId).subscribe({
        next: (hotelData) => {
          this.bookings[index].hotelTitle = hotelData.title;
          this.bookings[index].hotelCity = hotelData.city;
          this.bookings[index].hotelLocation = hotelData.location;
        },
        error: (err) => console.error('Error fetching hotel:', err)
      });
    }
  }

  
}
