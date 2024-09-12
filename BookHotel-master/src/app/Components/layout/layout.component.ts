import { Component, HostListener, OnInit } from '@angular/core';
import { DisplayService } from 'src/Services/display.service';
import { HotelDetailsService } from 'src/Services/hotel-details.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private hoteldetailsservice: HotelDetailsService, public displaySevice: DisplayService) {

    // Initialize minDate and checkInDate
    const today = new Date().toISOString().split('T')[0];
    this.minDate = today;
    this.checkInDate = today; // or set to a default value
  }


  ngOnInit(): void {
    // Initialize destinations:
    this.getCities();
  }

  // Destination:

  destination: string = '';
  showDropdown: boolean = false;

  // cities: string[] = ['Amritsar', 'Mumbai','Bengaluru','Chennai','Kochi',
  //   'Delhi','Visakhapatnam','Hyderabad','Kolkata'
  // ];

  cities: string[] = [];

  getCities(): void {
    this.hoteldetailsservice.getDistinctCities().subscribe(data => {
      data.forEach(element => {
        this.cities.push(element);
      });
      console.log(this.cities);
    });
  }

  filteredCities: string[] = this.cities;

  filterDestinations(): void {
    const inputValue = this.destination.toLowerCase();
    this.filteredCities = this.cities.filter(city => city.toLowerCase().includes(inputValue));
    this.showDropdown = true;
  }

  selectDestination(city: string): void {
    this.destination = city;
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('#citydropdown');
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }

  // Check in and check out:

  minDate: string;
  checkInDate: string;
  checkOutDate: string = '';

  onCheckInDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checkInDate = input.value;

    // Ensure check-out date is after check-in date
    if (this.checkOutDate && this.checkOutDate <= this.checkInDate) {
      this.checkOutDate = this.checkInDate;
    }
  }

  preventTyping(event: KeyboardEvent) {
    event.preventDefault();
  }

  // Rooms and guests:

  rooms: number = 1;
  adults: number = 2;
  children: number = 0;

  get totalGuests(): number {
    return this.adults + this.children;
  }

  increment(type: 'rooms' | 'adults' | 'children', event: Event): void {
    event.stopPropagation();
    if (type === 'rooms') {
      this.rooms++;
    } else if (type === 'adults') {
      this.adults++;
    } else if (type === 'children') {
      this.children++;
    }
  }

  decrement(type: 'rooms' | 'adults' | 'children', event: Event): void {
    event.stopPropagation();
    if (type === 'rooms' && this.rooms > 1) {
      this.rooms--;
    } else if (type === 'adults' && this.adults > 1) {
      this.adults--;
    } else if (type === 'children' && this.children > 0) {
      this.children--;
    }
  }

  // Search button click:

  dataReceived = false;

  showLoginAlert = false;

  closeLoginAlert() {
    this.showLoginAlert = false;
  }

  onSearchClick() {

    if (!this.displaySevice.isLoggedIn) {
      this.showLoginAlert = true;
      setTimeout(() => {
        this.showLoginAlert = false;
      }, 1000);

      return;
    }

    this.displaySevice.homeClicked = false;
    this.displaySevice.cardBookNowClicked = false;

    this.displaySevice.n_guests = this.totalGuests;
    this.displaySevice.checkInDate = this.checkInDate;
    this.displaySevice.checkOutDate = this.checkOutDate;
    this.displaySevice.n_days = this.calculateDaysBetweenDates(this.checkInDate, this.checkOutDate);
    this.displaySevice.nRoomsBooked = this.rooms;

    this.hoteldetailsservice.initializeHotels(this.destination, this.checkInDate, this.checkOutDate);

    // Subscribe to the shared boolean value
    this.hoteldetailsservice.sharedBoolean$.subscribe(value => {
      this.dataReceived = value;

      console.log("Is data received? " + this.dataReceived);
      if (this.dataReceived) {
        this.displaySevice.searchClicked = false;

        setTimeout(() => {
          console.log('Transition after search click...');
          this.displaySevice.searchClicked = true;
        }, 1000);
      }
    });

  }

  // Home link click

  onHomeClick() {
    this.displaySevice.showAboutUs = false;
    this.displaySevice.showContactUs = false;
    this.displaySevice.searchClicked = false;
    this.displaySevice.cardBookNowClicked = false;
    this.displaySevice.homeClicked = true;
    this.displaySevice.showSearchBar = true;
    this.displaySevice.myBookingsClicked = false;
  }

  // Log out

  logOut() {
    this.displaySevice.isLoggedIn = false;
    this.displaySevice.searchClicked = false;
    this.displaySevice.cardBookNowClicked = false;
    this.displaySevice.myBookingsClicked = false;
    this.displaySevice.homeClicked = true;
    this.displaySevice.showSearchBar = true;
  }

  // About link clicked:
  onAboutClick() {
    this.displaySevice.showSearchBar = false;
    this.displaySevice.homeClicked = false;
    this.displaySevice.searchClicked = false;
    this.displaySevice.cardBookNowClicked = false;
    this.displaySevice.showContactUs = false;
    this.displaySevice.showAboutUs = true;
    this.displaySevice.myBookingsClicked = false;
  }

  // Contact us link clicked:
  onContactUsClick() {
    this.displaySevice.showSearchBar = false;
    this.displaySevice.homeClicked = false;
    this.displaySevice.searchClicked = false;
    this.displaySevice.cardBookNowClicked = false;
    this.displaySevice.showAboutUs = false;
    this.displaySevice.showContactUs = true;
    this.displaySevice.myBookingsClicked = false;
  }

  // Calculate number of days

  calculateDaysBetweenDates(startDateStr: string, endDateStr: string): number {
    // Convert string dates to Date objects
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
  
    // Convert milliseconds to days
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    return differenceInDays;
  }

  onMyBookingsClick(){
    this.displaySevice.showSearchBar = false;
    this.displaySevice.homeClicked = false;
    this.displaySevice.searchClicked = false;
    this.displaySevice.cardBookNowClicked  = false;
    this.displaySevice.showAboutUs = false;
    this.displaySevice.showContactUs = false;
    this.displaySevice.myBookingsClicked = true;
  }
  

}
