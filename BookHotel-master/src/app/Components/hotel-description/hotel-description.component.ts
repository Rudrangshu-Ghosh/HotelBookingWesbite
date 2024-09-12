import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelCard } from 'src/Models/HotelCardModel';
import { DisplayService } from 'src/Services/display.service';
import { HotelDetailsService } from 'src/Services/hotel-details.service';

@Component({
  selector: 'app-hotel-description',
  templateUrl: './hotel-description.component.html',
  styleUrls: ['./hotel-description.component.css']
})
export class HotelDescriptionComponent implements OnInit {

  constructor(public displayService: DisplayService, private hotelDetailsService: HotelDetailsService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentHotel();
    this.getAmenities();
    this.calcAmount();
    console.log('selected hotel amount: '+this.displayService.amount);
  }

  currentHotel: HotelCard | undefined;

  getCurrentHotel() {
    this.currentHotel = this.hotelDetailsService.hotelcards.find(card => card._id === this.displayService.selectedHotelID);
    console.log(this.currentHotel);
  }

  hasWifi = false;
  hasPool = false;
  hasFood = false;
  hasRoomService = false;

  getAmenities() {
    if (this.currentHotel?.amenities.find(amenity => amenity.includes('Wifi'))) {
      this.hasWifi = true;
    }
    if (this.currentHotel?.amenities.find(amenity => amenity.toLowerCase().includes('pool'))) {
      this.hasPool = true;
    }
    if (this.currentHotel?.amenities.find(amenity => amenity.includes('Restaurant'))) {
      this.hasFood = true;
    }
    if (this.currentHotel?.amenities.find(amenity => amenity.includes('Room Service'))) {
      this.hasRoomService = true;
    }
  }

  navigateToPaymentForm() {
    this.displayService.cardBookNowClicked = false;
    this.displayService.showSearchBar = false;
    this.displayService.showFooter = false;
    this.router.navigate(['/paymentform']);
  }

  calcAmount() {
    if (this.currentHotel?.price) {
      
      let price = this.currentHotel.price;
      let taxes = this.currentHotel.taxes;
      let n_days = this.displayService.n_days;
      let nRooms = this.displayService.nRoomsBooked;

      this.displayService.finalPrice = price * nRooms * n_days;
      this.displayService.finalTax = taxes * nRooms * n_days;

      this.displayService.amount = this.displayService.finalPrice + this.displayService.finalTax;
    }
  }

}
