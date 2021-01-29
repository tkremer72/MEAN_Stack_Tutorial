import { AuthService } from './shared/services/auth.service';
import { Blog } from './shared/models/blog.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


 // storedBlogs: Blog[] = []

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
  // onBlogAdded(blog: any) {
  //   this.storedBlogs.push(blog);
  // }
}
