import { Component, ElementRef, ViewChild } from '@angular/core';
import { DisplayService } from 'src/Services/display.service';
import { UserService } from 'src/Services/user.service';

declare var bootstrap: any; // Declare bootstrap as global

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mobileNumber: string = '';

  constructor(private userService: UserService, public displayService: DisplayService) { }

  maxId = 0;
  ngOnInit(): void {
    this.userService.getMaxId().subscribe({
      next: (maxId: number) => {
        this.maxId = maxId;
        console.log('Max _id:', this.maxId);
      },
      error: (error) => {
        console.error('Error fetching max _id:', error);
      }
    });
  }

  // Sign up

  username = '';
  password_hash = '';

  showSignupSuccessAlert: boolean = false;

  signUp() {
    this.userService.signUp(this.maxId + 1, this.mobileNumber, this.username, this.password_hash).subscribe({

      next: response => {
        console.log('Sign up successful', response);
        this.alertClass = 'alert-success';  // Green alert
        this.alertText = 'Signup successful! Please go back to log in.';
        this.showSignupSuccessAlert = true;  // Show the alert on success
        setTimeout(() => {
          this.showSignupSuccessAlert = false;
        }, 1000);
        this.maxId++;
      },
      error: error => {
        console.error('Error signing up', error);
        this.alertClass = 'alert-danger';  //  alert
        this.alertText = 'There was an error signing up. Please try again!';
        this.showSignupSuccessAlert = true;  // Show the alert 
        setTimeout(() => {
          this.showSignupSuccessAlert = false;
        }, 2000);
      },
      complete: () => {
        console.log('Sign up request completed');
      }
    });
  }

  closeSignupAlert() {
    this.showSignupSuccessAlert = false;  // Close the alert when user clicks close
  }

  // Log in

  login = { mobileNumber: '', password: '' };

  showLoginSuccessAlert: boolean = false;
  alertClass = '';   // This will hold the dynamic Bootstrap alert class
  alertText = '';    // This will hold the dynamic alert message

  onLogin() {
    this.userService.login(this.mobileNumber, this.login.password).subscribe({
      next: response => {
        console.log('Login successful', response);
        this.alertClass = 'alert-success';  // Green alert
        this.alertText = 'Log in successful! Please close this log in window.';
        this.showLoginSuccessAlert = true;  // Show the alert on success
        this.displayService.isLoggedIn = true;
        this.fetchUsername();
        this.displayService.currentPhone = this.mobileNumber;
        setTimeout(() => {
          this.showLoginSuccessAlert = false;
        }, 2000);
      },
      error: error => {
        console.error('Error logging in', error);
        this.alertClass = 'alert-danger';   
        this.alertText = 'There was an error when trying to log in. Please try again!';
        this.showLoginSuccessAlert = true;  // Show the alert 
        setTimeout(() => {
          this.showLoginSuccessAlert = false;
        }, 2000);
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  }

  closeLoginAlert() {
    this.showLoginSuccessAlert = false;  // Close the alert when user clicks close
  }

  fetchUsername() {
    if (this.mobileNumber) {
      this.userService.getUsernameByMobileNumber(this.mobileNumber).subscribe(
        response => {
          this.displayService.currentUser = response.username;
          console.log('current user is: ' + this.displayService.currentUser);
        },
        error => {
          console.error('Error fetching username', error);
        }
      );
    }
  }

}
