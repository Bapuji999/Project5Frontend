import { CanActivateFn } from '@angular/router';

export const vendorGuard: CanActivateFn = (route, state) => {
  var role = localStorage.getItem('roll');
  if (role == 'Vendor') {
    return true;
  } else {
    return false;
  }
};
