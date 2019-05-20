import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
// import { throwError } from 'rxjs';
import * as StackTrace from 'stacktrace-js';

import { AppError } from './app-error';
import { BadInputError } from './bad-input-error';
import { NotFoundError } from './not-found-error';
import { InternalServerError } from './server-error';
import { HTTPError } from './http-error.model';
import { throwError } from 'rxjs';



@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

  constructor(private injector: Injector) {
    // to call the constructor of base's class
    // super(true);
    super();
  }
  handleError(error: any): void {
    if (error != null) {
      // const loggingService = this.injector.get(LoggingService);
      const message = error.message ? error.message : error.toString();
      const location = this.injector.get(LocationStrategy);
      const url = location instanceof PathLocationStrategy ? location.path() : '';

      // get the stack trace, lets grab the last 10 stacks only
      StackTrace.fromError(error).then(stackframes => {
        const stackString = stackframes
          .splice(0, 20)
          .map(function (sf) {
            return sf.toString();
          }).join('\n');
        console.log('%c STACKTRACEJS INFO !!! ', 'background: #5bc0de; color: #FFF', { error, message, url, stack: stackString });
      }).catch(() => { throw error; });
    } else {
      super.handleError(error);
    }
  }

}

export class GlobalHTTPErrorHanlder {

  constructor() {

  }

  public handleError(error: any) {
    let errMsg: string;
    if (error.error instanceof HttpErrorResponse) {
      const body = error || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      console.error('%c ERROR !!! ', 'background: #FF0000; color: #FFF', errMsg);
    } else {
      if (error.status === 404) {
        // return Observable.throw(new NotFoundError(error));
        // console.log('404 not found error');
        const err = new NotFoundError(error);
        const obj = { message: err['statusText'] };
        return throwError(obj);
        // return throwError(new NotFoundError(error));
      } else if (error.status === 400) {
        // return Observable.throw(new BadInputError(error.error.json()));
        // console.log('BadInputError error');
        // return throwError(new BadInputError(error.error.errors[0]));
        return throwError(error.error.errors[0]);
      } else if (error.status === 500) {
        // console.log('Internal server error');
        // return Observable.throw(new InternalServerError(error));
        const err = new InternalServerError(error);
        const obj = { message: err['statusText'] };
        return throwError(obj);
        // return throwError(new InternalServerError(error));
      } else {
        // console.log('App error');
        // return Observable.throw(new AppError(error));
        const err = new AppError(error);
        const obj = { message: err['statusText'] };
        // return throwError(new AppError(error));
        return throwError(obj);
        // const error1 = new Error('BOOM!');
        // return throwError(error1);
      }

    }
    // return Observable.throw(error);
    // return throwError(error);
  }
}
