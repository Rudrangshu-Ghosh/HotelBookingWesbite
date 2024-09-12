import { Component, OnInit } from '@angular/core';
import { HotelCard } from 'src/Models/HotelCardModel';
import { DisplayService } from 'src/Services/display.service';
import { HotelDetailsService } from 'src/Services/hotel-details.service';

@Component({
  selector: 'app-hotel-cards',
  templateUrl: './hotel-cards.component.html',
  styleUrls: ['./hotel-cards.component.css']
})
export class HotelCardsComponent implements OnInit {

  // Create an array of hotel card objects
  temphotelcards: HotelCard[] = [];

  constructor(private hoteldetailsservice: HotelDetailsService, public displayService: DisplayService) { }

  ngOnInit(): void {
    this.temphotelcards = [...this.hoteldetailsservice.hotelcards];
    console.log('card compnonent init!');
    console.log(this.temphotelcards);
    this.setDataAvailableToFalse();
  }

  setDataAvailableToFalse() {
    this.hoteldetailsservice.setHotelDataAvailable(false);  // Set it to true (or false as needed)
  }

  // Filtering and sorting logic:

  selectedSortOption: string = 'Sort by'; // Default dropdown text

  selectedRating: number = 5;
  minPrice: number = 0;
  maxPrice: number = 140000;
  sortCriteria: string = ''; // Track sorting criteria

  applyFiltersAndSorting() {
    // Step 1: Filter the hotelCards array
    let filteredHotels = this.hoteldetailsservice.hotelcards.filter(hotel =>
      hotel.score.scorenum >= this.selectedRating &&
      hotel.price >= this.minPrice &&
      hotel.price <= this.maxPrice
    );

    // Step 2: Apply sorting based on the current sortCriteria
    if (this.sortCriteria === 'priceAsc') {
      filteredHotels.sort((a, b) => a.price - b.price);
      this.selectedSortOption = 'Price Ascending ⬆';
    } else if (this.sortCriteria === 'priceDesc') {
      filteredHotels.sort((a, b) => b.price - a.price);
      this.selectedSortOption = 'Price Descending ⬇';
    } else if (this.sortCriteria === 'scoreAsc') {
      filteredHotels.sort((a, b) => a.score.scorenum - b.score.scorenum);
      this.selectedSortOption = 'Score Ascending ⬆';
    } else if (this.sortCriteria === 'scoreDesc') {
      filteredHotels.sort((a, b) => b.score.scorenum - a.score.scorenum);
      this.selectedSortOption = 'Score Descending ⬇';
    }

    // Step 3: Update the temphotelcards array with the filtered and sorted data
    this.temphotelcards = filteredHotels;
  }

  // Function to apply filters
  applyFilters() {
    this.applyFiltersAndSorting(); // Call combined filtering and sorting method
  }

  // Function to apply sorting
  sortHotels(criteria: string) {
    this.sortCriteria = criteria;
    this.applyFiltersAndSorting(); // Call combined filtering and sorting method
  }

  // Function to clear filters but keep the sorting
  clearFilters() {
    // Reset filters but not the sorting
    this.selectedRating = 5;
    this.minPrice = 0;
    this.maxPrice = 140000;

    // Apply sorting to the original data
    this.applyFiltersAndSorting();
  }

  // Function to clear sorting (when user selects "None" from dropdown)
  clearSorting() {
    this.selectedSortOption = 'Sort by';
    this.sortCriteria = ''; // Clear the sorting criteria
    this.applyFiltersAndSorting(); // Apply filters and clear sorting
  }


  // When user clicks on Book Now on the card
  onBookNowClick(selectedID: number){
    this.displayService.homeClicked = false;
    this.displayService.searchClicked = false;
    this.displayService.cardBookNowClicked = true;

    this.displayService.selectedHotelID = selectedID;
  }






}
