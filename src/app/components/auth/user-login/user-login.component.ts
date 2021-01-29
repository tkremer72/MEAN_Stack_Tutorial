import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {

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

  onLogin(form: NgForm) {
    //console.log(form.value);
    if(form.invalid) {
      return;
    }
//Show the spinner when the page is loading
    this.isLoading = true;
    this.authService.loginUser(form.value.user_email, form.value.user_password);
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }

}
