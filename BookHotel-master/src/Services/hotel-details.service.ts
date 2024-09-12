import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HotelCard } from 'src/Models/HotelCardModel';

@Injectable({
  providedIn: 'root'
})
export class HotelDetailsService {

  // Create an array of hotel card objects
  hotelcards: HotelCard[] = [];

  // Initialize the boolean variable with a default value, for example, false.
  private hotelDataAvailable = new BehaviorSubject<boolean>(false);
  
  // Expose the boolean variable as an observable
  sharedBoolean$ = this.hotelDataAvailable.asObservable();

  // Method to update the boolean value
  setHotelDataAvailable(value: boolean) {
    this.hotelDataAvailable.next(value);
  }

  
  constructor(private http: HttpClient) { }

  hotelreq = "https://localhost:7061/api/HotelDetails";

  //Method to get the list of all hotels from the API.
  getAllHotels(): Observable<HotelCard[]> {
    return this.http.get<HotelCard[]>(this.hotelreq);
  }

  getHotelById(id: number): Observable<HotelCard> {
    return this.http.get<HotelCard>(`${this.hotelreq}/${id}`);
  }

  searchHotels(destination: string, checkInDate: string, checkOutDate: string) {
    const params = new HttpParams()
        .set('destination', destination)
        .set('checkInDate', checkInDate)
        .set('checkOutDate', checkOutDate);
  
    return this.http.get<HotelCard[]>(`${this.hotelreq}/search`, { params });
  }

  initializeHotels(destination: string, checkInDate: string, checkOutDate: string): void {
    this.searchHotels(destination, checkInDate, checkOutDate).subscribe(data => {
      this.hotelcards = data;
      this.setImagePaths();
      this.setTaxes();

      this.setHotelDataAvailable(true);
      console.log(this.hotelcards);
    });
  }

  setImagePaths(): void{
    // Setting the image paths after data is fetched
    for (let index = 0; index < this.hotelcards.length; index++) {
      this.hotelcards[index].imgpath = `../../../assets/HotelImages/Hotel${this.hotelcards[index]._id}.jpg`;      
    }
  }

  setTaxes(): void{
    for (let index = 0; index < this.hotelcards.length; index++) {
      let price = this.hotelcards[index].price;
      if (price <= 1000) {
        this.hotelcards[index].taxes = 0;
      }
      else if(price > 1000 && price <= 7500){
        this.hotelcards[index].taxes = Math.round(0.12 * price);
      }
      else{
        this.hotelcards[index].taxes = Math.round(0.15 * price);
      }
      
    }
  }

  // Get a list of distinct cities from the database
  getDistinctCities() {
    return this.http.get<string[]>(`${this.hotelreq}/distinct-cities`);
  }
  
  
}
