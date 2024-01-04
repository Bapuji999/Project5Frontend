import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.loginForm.invalid) {
      var url = `https://localhost:44303/api/Login?userName=${this.loginForm.value.username}&password=${this.loginForm.value.password}`;
      this.http.post(url, {}, { responseType: 'text' }).subscribe({
        next: (response) => {
          const token = response;
          localStorage.setItem('token', token);
          this.route.navigate(['']);
        },
        error: (e) => { console.log(e); },
      });
    }
  }
}
