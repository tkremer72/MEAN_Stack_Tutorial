import { Blog } from '../../../shared/models/blog.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  public enteredTitle = '';
  public enteredContent = '';
  public enteredAuthor = '';
  public enteredDate = '';

  @Output() blogCreated = new EventEmitter<Blog>();



  constructor() { }

  ngOnInit() {
  }

  onAddBlog(
    form: NgForm
    /* blogInput: HTMLTextAreaElement */
    ) {
    //alert('Blog Added!')
    const blog: Blog = {
      title: form.value.title,
      content: form.value.content,
      author: form.value.author,
      date: form.value.date
    }
    this.blogCreated.emit(blog);
  }
}
