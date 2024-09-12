import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HotelCardsComponent } from './Components/hotel-cards/hotel-cards.component';
import { PaymentOptionComponent } from './Components/PaymentComponents/payment-option/payment-option.component';
import { PaymentConfirmedComponent } from './Components/PaymentComponents/payment-confirmed/payment-confirmed.component';
import { PaymentFormComponent } from './Components/PaymentComponents/payment-form/payment-form.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { HotelDescriptionComponent } from './Components/hotel-description/hotel-description.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { MyBookingsComponent } from './Components/my-bookings/my-bookings.component';

const routes: Routes = [
  { path: 'paymentform', component: PaymentFormComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'paymentoption', component: PaymentOptionComponent, canDeactivate: [CanDeactivateGuard]},
  { path: 'paymentconfirmed', component: PaymentConfirmedComponent, canDeactivate: [CanDeactivateGuard] },
  // {path: 'bookhotel', component: LayoutComponent},
  {path: 'hoteldesc', component: HotelDescriptionComponent},
  // { path: '', redirectTo: '/bookhotel', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
