import { Auth } from '../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { }

  registerUser(user_email: string, user_password: string) {
    const auth: Auth = {
      user_email: user_email,
      user_password: user_password
    }
    this.http.post('http://localhost:3000/api/auths/registration', auth)
    .subscribe(response => {
      //console.log(response);
    })
  }

  loginUser(user_email: string, user_password: string) {
    const auth: Auth = {
      user_email: user_email,
      user_password: user_password
    }
    this.http.post('http://localhost:3000/api/auths/login', auth).subscribe(response => {
      console.log(response);
    })
  }
}
