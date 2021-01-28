import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public isLoading = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onRegister(form: NgForm) {
    // console.log(form.value);
    if(form.invalid) {
      return;
    }
    this.authService.registerUser(form.value.user_email, form.value.user_password)
  }

}
