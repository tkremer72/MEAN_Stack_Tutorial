import { Blog } from '../../shared/models/blog.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Blog[] = [];

  private blogsUpdated = new Subject<Blog[]>();

  constructor(
    private http: HttpClient
  ) { }


  getBlogs() {
    this.http.get<{ message: string, blogs: any }>('http://localhost:3000/api/blogs')
      .pipe(map((blogData) => {
        return blogData.blogs.map((blog: { _id: any; title: any; content: any; author: any; date: any; }) => {
          return {
            id: blog._id,
            title: blog.title,
            content: blog.content,
            author: blog.author,
            date: blog.date
          };
        });
      }))
      .subscribe(transformedBlogs => {
        this.blogs = transformedBlogs;
        this.blogsUpdated.next([...this.blogs]);
      })
  }

  getBlogUpdateListener() {
    return this.blogsUpdated.asObservable();
  }

  getBlog(id: string) {
   // return {...this.blogs.find(b => b.id === id)};
   return this.http.get<{
     _id: string,
     title: string,
     content: string,
     author: string,
     date: string
   }>('http://localhost:3000/api/blogs/' + id);
  }

  addBlog(title: string, content: string, author: string, date: string) {
    const blog: Blog = {
      id: '',
      title: title,
      content: content,
      author: author,
      date: date
    };
    this.http.post<{ message: string, blogId: string }>('http://localhost:3000/api/blogs', blog)
      .subscribe(responseData => {
        //console.log(responseData.message);
        const id = responseData.blogId;
        blog.id = id;
        this.blogs.push(blog);
        this.blogsUpdated.next([...this.blogs]);
      });
  };

  updateBlog(id: string, title: string, content: string, author: string, date: string) {
    const blog: Blog = {
      id: id,
      title: title,
      content: content,
      author: author,
      date: date
    };
    this.http.put('http://localhost:3000/api/blogs/' + id, blog)
    .subscribe(response => {
      //console.log(response);
      const updatedBlogs = [...this.blogs];
      const oldBlogIndex = updatedBlogs.findIndex(b => b.id === blog.id);
      updatedBlogs[oldBlogIndex] = blog;
      this.blogs = updatedBlogs;
      this.blogsUpdated.next([...this.blogs]);
    });
  }

  deleteBlog(blogId: string) {
    this.http.delete('http://localhost:3000/api/blogs/' + blogId)
      .subscribe(() => {
        //console.log("Deleted!")
        const updatedBlogs = this.blogs.filter(blog => blog.id !== blogId);
        this.blogs = updatedBlogs;
        this.blogsUpdated.next([...this.blogs])
      });
  }
}
