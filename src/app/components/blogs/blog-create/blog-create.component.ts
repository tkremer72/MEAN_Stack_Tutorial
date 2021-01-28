import { ActivatedRoute, ParamMap } from '@angular/router';
import { Blog } from '../../../shared/models/blog.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/shared/services/blog.service';
import { mimeType } from '../../../shared/models/mime-type.validator';

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
  public isLoading = false;
  public form: FormGroup;
  public imagePreview: string;

  private mode = 'create';
  private blogId!: string;

  public blog!: Blog;

  //@Output() blogCreated = new EventEmitter<Blog>();

  constructor(
    public blogService: BlogService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ] }),
      'content': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ]}),
      'author': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ]}),
      'date': new FormControl(null,
        { validators: [ Validators.required, Validators.minLength(3) ]}),
      'image': new FormControl(null,
        { validators: [ Validators.required ], asyncValidators: [mimeType]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('blogId')) {
        this.mode = 'edit';
        this.blogId = paramMap.get('blogId');
        //Show the spinner
        this.isLoading = true;
        /* this.blog =  */ this.blogService.getBlog(this.blogId).subscribe(blogData => {
          //Hide the spinner
          this.isLoading = false;
          this.blog = {
            id: blogData._id,
            title: blogData.title,
            content: blogData.content,
            author: blogData.author,
            date: blogData.date,
            imagePath: blogData.imagePath
          };
          this.form.setValue({
            'title': this.blog.title,
            'content': this.blog.content,
            'author': this.blog.author,
            'date': this.blog.date,
            'image': this.blog.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.blogId = '';
      }
    });
  }

  onPickedImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.form);
    //convert the image to a data url
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveBlog(
    //form: NgForm
    /* blogInput: HTMLTextAreaElement */
  ) {
    //alert('Blog Added!')
    if (this.form.invalid) {
      return;
    }
    /* const blog: Blog = {
      title: form.value.title,
      content: form.value.content,
      author: form.value.author,
      date: form.value.date
    } */
    //Set isLoading to true or show the spinner
    this.isLoading = true;
    if (this.mode === 'create') {
      this.blogService.addBlog(
        this.form.value.title,
        this.form.value.content,
        this.form.value.author,
        this.form.value.date,
        this.form.value.image
        );
    } else {
      this.blogService.updateBlog(
        this.blogId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.author,
        this.form.value.date,
        this.form.value.image
        );
    }
    //this.resetForm();
        this.form.reset();
//this.blogCreated.emit(blog);
  }

}
