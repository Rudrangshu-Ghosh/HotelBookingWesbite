import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "https://localhost:7284/api/HotelUsers";

  constructor(private http: HttpClient) {}

  signUp(_id: number, mobile_number: string, username: string, password_hash: string) {
    return this.http.post(`${this.apiUrl}/signup`, {_id, mobile_number, username, password_hash});
  }

  login(mobile_number: string, password: string) {

    console.log('login service called');
    console.log(mobile_number + " " + password);
  
    return this.http.post(`${this.apiUrl}/login`, { mobile_number, password });
  }

  // Method to fetch the maximum _id
  getMaxId(): Observable<number> {
    return this.http.get<{ maxId: number }>(`${this.apiUrl}/max-id`)
      .pipe(map(response => response.maxId));
  }

  // Get username by mobile number
  getUsernameByMobileNumber(mobile_number: string): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(`${this.apiUrl}/username`, { params: { mobile_number } });
  }

  // Get user ID by mobile number
  getUserByMobile(mobile_number: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getByMobile?mobile_number=${mobile_number}`);
  }

}
