import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  var role = localStorage.getItem('roll');
  if (role == 'Admin') {
    return true;
  } else {
    return false;
  }
};
