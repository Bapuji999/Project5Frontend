import { CanActivateFn, Router } from '@angular/router';

export const isCustomerGuard: CanActivateFn = (route, state) => {
  var role = localStorage.getItem('roll');
  if (role == 'Customer') {
    return true;
  } else {
    return false;
  }
};
