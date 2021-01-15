import { Component, OnInit, Input } from '@angular/core';
import { Blog } from '../../../shared/models/blog.model';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent implements OnInit {
 /*  blogs = [
    { id: '1', title: 'Title 1', content: 'This is the content of the blog 1.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
    { id: '2', title: 'Title 2', content: 'This is the content of the blog 2.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
    { id: '3', title: 'Title 3', content: 'This is the content of the blog 3.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
    { id: '4', title: 'Title 4', content: 'This is the content of the blog 4.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
    { id: '5', title: 'Title 5', content: 'This is the content of the blog 5.', author: 'Thomas Kremer', date: Date.now(), imagePath: 'http://bingbingdingding.com', creator: '1' },
  ]; */
  @Input() blogs: Blog[] = [];

  constructor() { }

  ngOnInit() {
  }

}
