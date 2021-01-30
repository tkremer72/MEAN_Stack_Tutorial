import { Auth } from '../models/auth.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const   BACKEND_URL = environment.authUrlApi;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private isAdmin: boolean;
  private is_admin: any;

  private authStatusListener = new Subject<boolean>();


  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIs_admin() {
    return this.is_admin;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getUserId() {
    return this.userId;
  }

//Register a user
  registerUser(user_email: string, user_password: string) {
    const auth: Auth = {
      user_email: user_email,
      user_password: user_password
    }
    return this.http.post(BACKEND_URL + '/registration', auth)
    .subscribe(response => {
      //console.log(response);
      this.router.navigate(['/users-login']);
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  //Log a user in
  loginUser(user_email: string, user_password: string) {
    const auth: Auth = {
      user_email: user_email,
      user_password: user_password
    }
    this.http.post<{ token: string, expiresIn: number, userId: string, is_admin: any, isAdmin: any }>(BACKEND_URL + '/login', auth).subscribe(response => {
    //  console.log(response);
    const token = response.token;
    this.token = token;
    if(token) {
    const expiresInDuration = response.expiresIn;
    this.setAuthTimer(expiresInDuration);
      //console.log(expiresInDuration);
    this.isAuthenticated = true;
    this.userId = response.userId;
    this.is_admin = response.is_admin;
    this.isAdmin = response.is_admin;
    this.authStatusListener.next(true);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    //console.log(expirationDate)
    this.saveAuthData(token, expirationDate, this.userId, this.is_admin, this.isAdmin)
    this.router.navigate(['/']);
    }
    }, error => {
      this.authStatusListener.next(false);
    });
  }
//Automatically authenticate the user
autoAuthUser() {
  const authInformation = this.getAuthData();
  if(!authInformation) {
    return;
  }
  const now = new Date();
  const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
  //console.log(authInformation, expiresIn)
  if(expiresIn > 0) {
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
    this.is_admin = authInformation.is_admin;
    this.isAdmin = authInformation.isAdmin;
    this.setAuthTimer(expiresIn / 1000);
    this.authStatusListener.next(true);
  }
}
//Log a user out
logoutUser() {
  this.token = null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  clearTimeout(this.tokenTimer);
  this.clearAuthData();
  this.userId = null;
  this.is_admin = null;
  this.isAdmin = null;
  this.router.navigate(['/users-login']);
}

  private setAuthTimer(duration: number) {
    //console.log("Setting timer: " + duration)
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string, is_admin: any, isAdmin: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('is_admin', is_admin);
    localStorage.setItem('isAdmin', isAdmin);
  }
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('isAdmin');

  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const is_admin = localStorage.getItem('is_admin');
    const isAdmin = localStorage.getItem('isAdmin');
    if(!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: this.userId,
      is_admin: this.is_admin,
      isAdmin: this.isAdmin
    }
  }
}
