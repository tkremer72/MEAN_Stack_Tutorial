import { AuthService } from '../../../shared/services/auth.service';
import { BlogService } from '../../../shared/services/blog.service';
import { Blog } from '../../../shared/models/blog.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public user: User;
  public is_admin: string;
  public userId: string;
  public blogId: string;
  public blogs: Blog[] = [];

  public userIsAuthenticated = false;
  public userIsAdmin = false;

  private authStatusSubs: Subscription;
  private blogStatusSubs: Subscription;
  private userStatusSubs: Subscription;

  constructor(
    private authService: AuthService,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    this.authStatusSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
    this.isLoading = false;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('userId')) {
        this.userId = paramMap.get('userId')
        this.isLoading = true;
        this.userService.getUser(this.userId).subscribe(userData => {
          this.isLoading = false;
          this.user = {
            id: userData._id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            user_email: userData.user_email,
            user_name: userData.user_name,
            user_street: userData.user_street,
            user_city: userData.user_city,
            user_state: userData.user_state,
            user_zip: userData.user_zip,
            user_phone: userData.user_phone,
            user_mobile: userData.user_mobile,
            imagePath: userData.imagePath,
            creator: userData.creator
          }
        });
      }
    });
  }




  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
   // this.blogStatusSubs.unsubscribe();
    //this.userStatusSubs.unsubscribe();
  }

}
