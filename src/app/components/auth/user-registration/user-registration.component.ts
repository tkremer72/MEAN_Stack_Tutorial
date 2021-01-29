import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit, OnDestroy {

  public isLoading = false;

  private authStatusSubs: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authStatusSubs = this.authService.getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  onRegister(form: NgForm) {
    // console.log(form.value);
    if(form.invalid) {
      return;
    }
//Show the spinner when the page is loading
    this.isLoading = true;
    this.authService.registerUser(form.value.user_email, form.value.user_password);
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }

}
