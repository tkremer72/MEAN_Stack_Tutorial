import { Blog } from '../../../shared/models/blog.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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

  private mode = 'create';
  private blogId!: string;

  public blog!: Blog;

  //@Output() blogCreated = new EventEmitter<Blog>();

  constructor(
    public blogService: BlogService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('blogId')) {
        this.mode = 'edit';
        this.blogId = paramMap.get('blogId');
        /* this.blog =  */ this.blogService.getBlog(this.blogId).subscribe(blogData => {
          this.blog = {
            id: blogData._id,
            title: blogData.title,
            content: blogData.content,
            author: blogData.author,
            date: blogData.date
          }
        });
      } else {
        this.mode = 'create';
        this.blogId = '';
      }
    });
  }

  onSaveBlog(
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
    if(this.mode === 'create') {
       this.blogService.addBlog(form.value.title, form.value.content, form.value.author, form.value.date);
    } else {
      this.blogService.updateBlog(this.blogId, form.value.title, form.value.content, form.value.author, form.value.date);
    }
    form.resetForm();
    //this.blogCreated.emit(blog);
  }
}
