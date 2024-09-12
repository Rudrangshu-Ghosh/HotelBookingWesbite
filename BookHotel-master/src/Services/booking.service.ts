import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'https://localhost:7173/api/Booking';  // Adjust URL as needed

  constructor(private http: HttpClient) {}

  // Create a booking
  createBooking(booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, booking);
  }

  // Get bookings by user ID
  getUserBookings(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
}
