import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  var routing = new Router;
  var token = localStorage.getItem('token');
  if(!token){
    routing.navigate(['/login']);
    return false;
  }
  return true;
};
export const notLoginGuard: CanActivateFn = (route, state) => {
  var token = localStorage.getItem('token');
  var routing = new Router;
  if(token){
    routing.navigate(['']);
    return false;
  }
  return true;
};