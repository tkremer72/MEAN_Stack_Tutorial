import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorComponent } from 'src/app/components/shared/error/error.component';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private dialog: MatDialog
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "Something went wrong, an unknown error has occurred!"
        if(error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorComponent, { data: { message: errorMessage}});
        //  alert(error.error.error.message);
        return throwError(error);
      })
    );
  }
}
