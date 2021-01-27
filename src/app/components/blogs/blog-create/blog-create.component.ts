import { Blog } from '../../../shared/models/blog.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogService } from 'src/app/shared/services/blog.service';

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

  //@Output() blogCreated = new EventEmitter<Blog>();



  constructor(
    public blogService: BlogService
  ) { }

  ngOnInit() {
  }

  onAddBlog(
    form: NgForm
    /* blogInput: HTMLTextAreaElement */
    ) {
    //alert('Blog Added!')
    if(form.invalid) {
      return;
    }
    /* const blog: Blog = {
      title: form.value.title,
      content: form.value.content,
      author: form.value.author,
      date: form.value.date
    } */
    this.blogService.addBlog(form.value.title, form.value.content, form.value.author, form.value.date);
    form.resetForm();
    //this.blogCreated.emit(blog);
  }
}
