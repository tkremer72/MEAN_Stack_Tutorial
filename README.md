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

Create a simple server in the root of the project.  server.js.  Next install the express framework. npm install --save express.  Within the backend folder create an app.js file to hold the express app.  Modify the server.js file with error handling and other checks for listening to the port and exiting gracefully if there is an issue.  Install nodemon package, npm install --save-dev nodemon.

Now the Node.js development environment is set up.  Time to start using the Node.js backend. Add the cors policy manually and automatically within the app.js file before any routes. Install the cors package for the automatic use case, npm install --save cors. Next install the body-parser package so that we can read incoming requests from the frontend or parse them. npm install --save body-parser.

Install mongoose to connect to mongo db. npm install --save mongoose

Add routes for adding a blog, getting blogs, and deleting a blog to the app.js file.  Also add the connection string, the connection method and include the start script to run the app.

Next will be the routing, tomorrow. If you did not choose to include angular routing, you will need to add the app-routing.module.ts file.  I did include this so I will need to set up route paths to all of the components. 

At this point I turned off the typescript strict null checks property in the tsconfig.json file.  under compiler options added "strictNullChecks": false

Time to Re-Organize the backend routes.  Create controllers, routes etc.  Also adding loading spinners. 

The next step will be adding image uploads to the blogs. Switch to reactive forms approach and add a custom validator for selecting files. This will disable ngModel when I remove the FormsModule.  I will also remove all references to the ngModel in my blogcreate component. 

Time to add the image controls to the form. Next add the image preview. Once the image preview is set up, time to validate that there is an image. Install multer so that I can implement file uploading.
npm install --save multer

Setup the backend to get images in the route, store them on the backend, and display them on the frontend. 

Time to implement pagination.  Add the paginator to the list blogs component html file, add properties for legth, pageSize, and for pageSizeOptions to the paginator, and to the list blogs component ts file.  Include the query params in the get blogs method in the list blogs ts file, the blog service file and on the get blogs controller in the backend.  Look at code to see this in action or implemented.  Next we need to fetch the blogs correctly so that the total number of blogs updates in the paginator, we also need to change the pagecount when blogs are removed or added. 

Time to add the user into the application equation.  While I would have done this step first and implemented all the above into the users for an administrative user, I will attempt this now by following the steps in the tutorial.

First he creates an auth folder with the login and signup components and their files.  I have already done this with the CLI and my folders are user-login and user-registration.  While the author of the tutorial is creating all of his files and components manually, I have used the CLI except for the mime-type.validator.ts file which I just downloaded and copied in.

Create the user login form in the user-login html file.  Edit the stylesheet for the user login component, add new links to the header component html file for the registration and login.  style the header by adding display flex to the ul element. Once done with that do the same for the user-registration page. The way this is set up is to be very explicit, you could merge some of the forms and have a shared component that links them with the selectors. 

Create a user model, include the property for the image just in case I decide to include an image for the user.

install mongoose-unique-validator so that you can validate the user email by being unique. npm install --save mongoose-unique-validator, once the model is completed I will need to install a couple of other packages, one is the jsonwebtoken package, one is the bcryptjs package.  The tutorial uses just the bcrypt package but toward the end of the tutorial because of errors thrown changes it to the bcryptjs package so I will just do that to start with.  
npm install --save jsonwebtoken
npm install --save bcryptjs 
or you can just install them together npm install --save jsonwebtoken bcryptjs

implementing protected routes so that only authenticated users can go to certain things.  Also attaching the token to requests, improving the header to verify authentication.  Create an auth interceptor to attach the token to requests.  Include the Authorization header in the cors policies.  Test to see if the authentication is working. 

Improving the UI to reflect Authentication Status. Show and hide elements based on the user being logged in or out, add the loading spinner to the login component and the registration component.  Hide the buttons if the page is loading, show the spinner instead and vice versa.
I will add a route guard next. Reflecting the token expiration in the UI and saving the token in local storage. Connect the user to the blogs by that user and eventually do the same to the user information. 

Protecting the resources with authorization. Added the userData I want to use in the application to the decodedToken property within the verify.js file to check authentication. Restrict who can edit and delete a blog by checking if the user is the creator or not to show the buttons.
Handling errors. stop the loading spinner when an error occurs and redirect the user.  Add a global error interceptor to handle errors globally. Adding error dialog and returning error messages on the server. 

Creating an angular-material module and feature modules to split the application up some. Create a blogs module, and an auth module. 

Implement lazy loading.  Even if the declarations are empty in the routing module, they must be included, you can't leave out the declarations array, empty or not.  Lazy loading is not implemented and both methods or ways work.  

Implement global configuration using the environments on the angular frontend and useing the nodemon.json or global environments for the backend as well. 























