import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './Components/login/login.component';
import { HotelCardsComponent } from './Components/hotel-cards/hotel-cards.component';
import {HttpClientModule} from '@angular/common/http';
import { LayoutComponent } from './Components/layout/layout.component';
import { HotelDescriptionComponent } from './Components/hotel-description/hotel-description.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { PaymentFormComponent } from './Components/PaymentComponents/payment-form/payment-form.component';
import { PaymentOptionComponent } from './Components/PaymentComponents/payment-option/payment-option.component';
import { PaymentConfirmedComponent } from './Components/PaymentComponents/payment-confirmed/payment-confirmed.component';
import { MyBookingsComponent } from './Components/my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HotelCardsComponent,
    LayoutComponent,
    HotelDescriptionComponent,
    AboutUsComponent,
    ContactUsComponent,
    PaymentFormComponent,
    PaymentOptionComponent,
    PaymentConfirmedComponent,
    MyBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
