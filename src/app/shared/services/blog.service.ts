import { Blog } from '../../shared/models/blog.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.blogUrlApi;

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Blog[] = [];

  private blogsUpdated = new Subject<{ blogs: Blog[], blogCount: number }>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

//Get all of the blogs in the database

  getAllBlogs(blogsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${blogsPerPage}&page=${currentPage}`
    this.http.get<{ message: string, blogs: any, maxBlogs: number }>(BACKEND_URL + queryParams)
      .pipe(map((blogData) => {
        return {
          blogs: blogData.blogs.map((blog: { _id: any; title: any; content: any; author: any; date: any; imagePath: any; creator: any}) => {
            return {
              id: blog._id,
              title: blog.title,
              content: blog.content,
              author: blog.author,
              date: blog.date,
              imagePath: blog.imagePath,
              creator: blog.creator
            };
          }), maxBlogs: blogData.maxBlogs
        };
      })
      )
      .subscribe(transformedBlogData => {
        //console.log(transformedBlogData);
        this.blogs = transformedBlogData.blogs;
        this.blogsUpdated.next({ blogs: [...this.blogs], blogCount: transformedBlogData.maxBlogs });
      })
  }
//Get all of the blogs by the user that is logged in
// getUsersBlogs(blogsPerPage: number, currentPage: number) {
//   const queryParams = `?pagesize=${blogsPerPage}&page=${currentPage}`
//   this.http.get<{ message: string, blogs: any, maxBlogs: number }>(
//     'http://localhost:3000/api/blogs/users-blogs' + queryParams
//     )
//     .pipe(map((blogData) => {
//       return {
//         blogs: blogData.blogs.map((blog: { _id: any; title: any; content: any; author: any; date: any; imagePath: any; creator: any}) => {
//           return {
//             id: blog._id,
//             title: blog.title,
//             content: blog.content,
//             author: blog.author,
//             date: blog.date,
//             imagePath: blog.imagePath,
//             creator: blog.creator
//           };
//         }), maxBlogs: blogData.maxBlogs
//       };
//     })
//     )
//     .subscribe(transformedBlogData => {
//       //console.log(transformedBlogData);
//       this.blogs = transformedBlogData.blogs;
//       this.blogsUpdated.next({ blogs: [...this.blogs], blogCount: transformedBlogData.maxBlogs });
//     })
// }

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
      date: string,
      imagePath: string,
      creator: string
    }>(BACKEND_URL + '/' + id);
  }

  addBlog(title: string, content: string, author: string, date: string, image: File) {
    // const blog: Blog = {
    //   id: '',
    //   title: title,
    //   content: content,
    //   author: author,
    //   date: date
    // };
    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("content", content);
    blogData.append("author", author);
    blogData.append("date", date);
    blogData.append("image", image, title);
    this.http.post<{ message: string, blog: Blog }>(BACKEND_URL, blogData)
      .subscribe(responseData => {
        //console.log(responseData.message);
        // const blog: Blog = {
        //   id: responseData.blog.id,
        //   title: title,
        //   content: content,
        //   author: author,
        //   date: date,
        //   imagePath: responseData.blog.imagePath
        // }
        // // const id = responseData.blogId;
        // // blog.id = id;
        // this.blogs.push(blog);
        // this.blogsUpdated.next([...this.blogs]);
        this.router.navigate(['/']);
      });
  };

  updateBlog(id: string, title: string, content: string, author: string, date: string, image: File | string, creator: string) {
    // const blog: Blog = {
    //   id: id,
    //   title: title,
    //   content: content,
    //   author: author,
    //   date: date,
    //   imagePath: null
    // };
    let blogData: Blog | FormData;

    if (typeof (image) === 'object') {
      blogData = new FormData();
      blogData.append('id', id);
      blogData.append('title', title);
      blogData.append('content', content);
      blogData.append('author', author);
      blogData.append('date', date);
      blogData.append('image', image, title)
    } else {
      blogData = {
        id: id,
        title: title,
        content: content,
        author: author,
        date: date,
        imagePath: image,
        creator: null
      }
    }
    this.http.put(BACKEND_URL + id, blogData)
      .subscribe(response => {
        //console.log(response);
        // const updatedBlogs = [...this.blogs];
        // const oldBlogIndex = updatedBlogs.findIndex(b => b.id === id);
        // const blog: Blog = {
        //   id: id,
        //   title: title,
        //   content: content,
        //   author: author,
        //   date: date,
        //   imagePath: ""
        // }
        // updatedBlogs[oldBlogIndex] = blog;
        // this.blogs = updatedBlogs;
        // this.blogsUpdated.next([...this.blogs]);
        this.router.navigate(['/']);
      });
  }

  deleteBlog(blogId: string) {
   return this.http.delete(BACKEND_URL + '/' + blogId);
      // .subscribe(() => {
      //   //console.log("Deleted!")
      //   const updatedBlogs = this.blogs.filter(blog => blog.id !== blogId);
      //   this.blogs = updatedBlogs;
      //   this.blogsUpdated.next([...this.blogs])
      // });
  }
}
