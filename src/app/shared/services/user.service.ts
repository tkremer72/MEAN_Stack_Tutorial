import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const BACKEND_URL = environment.userUrlApi;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  private usersUpdated = new Subject<{ users: User[], userCount: number }>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getProfile(userId: string) {
    return this.http.get(BACKEND_URL + '/' + userId)
  }

  getUser(userId: string) {
    return this.http.get<{
      _id: string,
      first_name: string,
      last_name: string,
      user_email: string,
      user_name: string,
      user_street: string,
      user_city: string,
      user_state: string,
      user_zip: string,
      user_phone: string,
      user_mobile: string,
      imagePath: string,
      creator: string
    }>(BACKEND_URL + '/' + userId);
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  addUser(
    first_name: string,
    last_name: string,
    user_email: string,
    user_name: string,
    user_street: string,
    user_city: string,
    user_state: string,
    user_zip: string,
    user_phone: string,
    user_mobile: string,
    image: File
    ) {
      const userData = new FormData();
      userData.append('first_name', first_name);
      userData.append('last_name', last_name);
      userData.append('user_email', user_email);
      userData.append('user_name', user_name);
      userData.append('user_street', user_street);
      userData.append('user_city', user_city);
      userData.append('user_state', user_state);
      userData.append('user_zip', user_zip);
      userData.append('user_phone', user_phone);
      userData.append('user_mobile', user_mobile);
      userData.append('image', image, user_name);
      this.http.post<{ message: string, user: User }>(BACKEND_URL + '/create', userData)
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateUser(
    id: string,
    first_name: string,
    last_name: string,
    user_email: string,
    user_name: string,
    user_street: string,
    user_city: string,
    user_state: string,
    user_zip: string,
    user_phone: string,
    user_mobile: string,
    image: File | string,
    creator: string
    ) {
      let userData: User | FormData;
      if(typeof(image) === 'object') {
        userData = new FormData();
        userData.append('id', id);
        userData.append('first_name', first_name);
        userData.append('last_name', last_name);
        userData.append('user_email', user_email);
        userData.append('user_name', user_name);
        userData.append('user_street', user_street);
        userData.append('user_city', user_city);
        userData.append('user_state', user_state);
        userData.append('user_zip', user_zip);
        userData.append('user_phone', user_phone);
        userData.append('user_mobile', user_mobile);
        userData.append('image', image, user_name);
      } else {
        userData = {
          id: id,
          first_name: first_name,
          last_name: last_name,
          user_email: user_email,
          user_name: user_name,
          user_street: user_street,
          user_city: user_city,
          user_state: user_state,
          user_zip: user_zip,
          user_phone: user_phone,
          user_mobile: user_mobile,
          imagePath: image,
          creator: null
        }
      }
      this.http.put(BACKEND_URL + '/' + id, userData)
      .subscribe(responseData => {
        this.router.navigate(['/'])
      })
  }

  deleteUser(userId: string) {
    return this.http.delete(BACKEND_URL + '/' + userId)
  }
}
