# MeanTutorial

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Start off by clearing out the boiler plate code in the app component. Also initialize the local git repository and add project then push it to the remote project repository on github.  Create the development branch and begin coding. 

Swtiched into the new development branch, merged pull requests and change default branch on github to the dev branch for the development process. 

Use the Angular CLI to add a few components, services, guards and interceptors.

ng g c components/auth/user-login
ng g c components/auth/user-registration

ng g c components/blogs/blog-create
ng g c components/blogs/list-Blogs

ng g c components/users/user-profile
ng g c components/users/list-users
ng g c components/users/update-user

ng g c components/shared/header
ng g c components/shared/footer
ng g c components/shared/error

ng g s shared/services/auth
ng g s shared/services/blog
ng g s shared/services/user

ng g interceptor shared/interceptors/auth
ng g interceptor shared/interceptors/error

ng g guard shared/guards/auth

Added a text area and a button to the blog-create component, next will add an event listener to the button so that when it is clicked something happens. The event that will be added is a click event and looks like this.  (click)="onAddBlog()".  Next add a method to the blog-create component.ts file. The method will be onAddBlog() and for now will trigger an alert to show that it is working.

Add some dummy content to display when the button is clicked.  Create a property to store the data to output within the blog-create.component.ts file.  I will set this property to an empty string like so -> public newBlog = '';

Then in the onAddBlog method I will override the empty string with the following code. -> this.newBlog = 'The user\'s blog'; Then add an output hook to the html file with string interpolation like so -> {{newBlog}};

Prepopulate with some dummy content. Change the empty string in the ts file to NO CONTENT, this displays under the button before it is clicked, I can also use the string interpolation on the textarea to do the same thing. I can do this one of two ways, I can use the [value]="'String'" which will display the word or words in single quotation marks within the text area or I can use [value]="newBlog", which will bind the value of the property new blog on the ts file to the text area.  This will also display the text dummy text that is produced when the user clicks the button. 

Getting user input one of two ways, local reference by adding a marker or variable to the input element by using  hashtag #blogInput and pass a reference to it within the onAddBlog event within the template like so (click)="onAddBlog(blogInput)" without the hashtag.  We can see this work by expecting it as an argument within the onAddBLog method in the ts file like so onAddBlog(blogInput: HTMLTextAreaElement) { this.newBlog = blogInput.value}.

The second way that we can get the users input is with two way data binding.  Rather than manually setting the value and setting a reference to it, we can get rid of both and add a new feature which involves the setting and reading of a value.  This is called ngModel and looks like this. [(ngModel)]="" and is called a directive. We will use this on the text area and bind it to a new property on the ts file called enteredValue which is originally set to an empty string like so public enteredValue=' ';  In order to do this though I need to add the FormsModule to the app.module.ts file or Angular will throw an error.  We can now remove the blogInput property from the methods and set this.newBlog = enteredValue.

Time to add Angular Material to this project

ng add @angular/material, I am choosing to use the deep purple with amber color theme.  Select y to both questions that comes next and let it finish installing.  Then I will include the imports needed. 

Add a mat-card tag to the blog create component, inside of the mat-card add a form-field tag and inside of that move the input elements.  Next add matInput to the input elements. 

Add some custom css to the blog create component to pretty it up a little.   Inside of the blog-create.component.css file add a mat-card selector and a mat-form-field selector and include some width bounderies and margin bounderies.  Move the button into the card under the form-field, remove the hr tag .

Time to work on the header and navigation component. Inside the header.component.html file, add the mat-toolbar with the All Blogs title.  For now I include this in the app.component.html file so that I can see what I am doing.   I will work on navigation for this app later.

Inside of the list-blogs.component.html file, I add a mat-accordion tag with a mat-expansion-panel inside of it.  inside of that I add a mat-expansion-panel-header.  Remove the style for mat-card from the blog-create.component.css file and set the style for the app.component.html main component so that everything is the same size. I will do this in the app.component.css file and set the width to 80% and the margin to auto.  Add some space between the list-blogs component and the blog-create component by targeting the :host property inside of the list-blogs component and setting the display to block and the margin-top to 1rem.  Next I went back and changed the style inside of the app.component.css file so that the main has a margin of 1rem auto so that it has some space between the header and the blog-create component. 

Create a dummy list of blogs in the list-blogs component ts file.  Use the ngFor directive in the list-blogs component to dynamically loop through our dummy list of blogs. Add multi="true" to the mat-accordion to allow more than one panel to be open at a time. 

Set up the accordion to only render a list of blogs if there are blogs in the database to be rendered.  To do this use the structural directive ngIf in the mat-accordion. 

I added the rest of the inputs for the blog-create component, included properties for them in the ts file.  Next I will emit an event for when a new blog is added to the database. impor the event emitter and the output from angular, then include a property called blogCreated which will be a new EventEmitter and include it in the property list with the @Ouput() decorator.  Inside of the onAddBlog() method add this.blogCreated.emit(blog);
Finally I use event binding to listen for the event emitter. I do this in the app-blog-create tag in the app.component.html file.  Create a property inside the app.component.ts file called blogs and set it to an empty array.  Then create an onBlogAdded(blog) {} method within this component ts file 








