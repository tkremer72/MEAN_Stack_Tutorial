import { Component, OnInit } from '@angular/core';
import { Blog } from './shared/models/blog.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


 // storedBlogs: Blog[] = []

  constructor() {}

  ngOnInit() {
  }
  // onBlogAdded(blog: any) {
  //   this.storedBlogs.push(blog);
  // }
}
