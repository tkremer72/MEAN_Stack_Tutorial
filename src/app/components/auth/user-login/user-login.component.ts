import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public isLoading = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    //console.log(form.value);
    if(form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.user_email, form.value.user_password);
  }

}
