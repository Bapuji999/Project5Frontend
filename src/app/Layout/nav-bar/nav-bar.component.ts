import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(
    private route:Router
  ){}
  roll:string = '';
  ngOnInit(): void {
    var role = localStorage.getItem('roll')
    if(role != null){
      this.roll = role;
    }
  }
  logout(){
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
