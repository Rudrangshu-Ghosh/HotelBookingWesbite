import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  public homeClicked = true;
  public searchClicked = false;
  public cardBookNowClicked = false;
  public myBookingsClicked = false;

  public selectedHotelID = 0;

  public isLoggedIn = false;
  public currentUser = '';
  public fullName = '';
  public currentPhone = '';
  public currentEmail = '';
  public checkInDate = '';
  public checkOutDate = '';
  public n_guests = 1;
  public n_days = 0;
  public nRoomsBooked = 0;
  public finalPrice = 0;
  public finalTax = 0;
  public amount = 0;
  public paymentOption = '';

  public showAboutUs = false;
  public showContactUs = false;
  public showSearchBar = true;
  public showFooter = true;

  public showNavBar = true;

  constructor() { }
}
