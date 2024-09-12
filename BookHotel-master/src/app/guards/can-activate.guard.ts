import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
  private hasVisitedPaymentForm = false;

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUrl = state.url;

    // Ensure that the user can only visit pages in the correct order
    if (currentUrl === '/paymentoption' || currentUrl === '/paymentconfirmed') {
      if (!this.hasVisitedPaymentForm) {
        // Redirect to payment form if they haven't visited it yet
        this.router.navigate(['/paymentform']);
        return false;
      }
    }

    // If visiting the payment form, mark it as visited
    if (currentUrl === '/paymentform') {
      this.hasVisitedPaymentForm = true;
    }

    return true;
  }
  
}
