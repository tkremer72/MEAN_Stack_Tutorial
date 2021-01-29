import { AuthService } from 'src/app/shared/services/auth.service';
import { Blog } from '../../../shared/models/blog.model';
import { BlogService } from 'src/app/shared/services/blog.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent implements OnInit, OnDestroy {
 /*  blogs = [
    { id: '1', title: 'Title 1', content: 'This is the content of the blog 1.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
    { id: '2', title: 'Title 2', content: 'This is the content of the blog 2.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
    { id: '3', title: 'Title 3', content: 'This is the content of the blog 3.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
    { id: '4', title: 'Title 4', content: 'This is the content of the blog 4.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
    { id: '5', title: 'Title 5', content: 'This is the content of the blog 5.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
  ]; */
/*   @Input() */
public isLoading = false;
public blogs: Blog[] = [];

public totalBlogs = 0;
public blogsPerPage = 3;
public currentPage = 1;
public pageSizeOptions = [1, 3, 5, 10, 25];
public userIsAuthenticated = false;
public userId: string;

private blogsSubs: Subscription;
private authStatusSubs: Subscription;

  constructor(
    private authService: AuthService,
    public blogService: BlogService
  ) { }

  ngOnInit() {
    //Show the loading spinner before doing anything else
    this.isLoading = true;
    this.blogService.getAllBlogs(this.blogsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.blogsSubs = this.blogService.getBlogUpdateListener()
    .subscribe((blogData: { blogs: Blog[], blogCount: number }) => {
      this.isLoading = false;
      this.totalBlogs = blogData.blogCount;
      this.blogs = blogData.blogs;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  onChangedPage(pageData: PageEvent) {
    //console.log(pageData);
    //show the spinner when the page is changed.
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.blogsPerPage = pageData.pageSize;
    this.blogService.getAllBlogs(this.blogsPerPage, this.currentPage);
  }

  onDelete(blogId: string) {
    this.isLoading = true;
    this.blogService.deleteBlog(blogId).subscribe(() => {
      this.blogService.getAllBlogs(this.blogsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
    this.blogsSubs.unsubscribe();
  }
}
