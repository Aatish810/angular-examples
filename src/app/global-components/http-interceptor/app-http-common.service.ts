import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


import { GlobalHTTPErrorHanlder } from '../global-error-handler/global-error-handler';


@Injectable()
export class HTTPCommonService {

    constructor(private http: HttpClient, private globalHTTPErrorHanlder: GlobalHTTPErrorHanlder) { }

    get(url: string): Observable<any> {
        return this.http.get(url).pipe(map(res => this.extractData(res)))
            .pipe(catchError(err => this.globalHTTPErrorHanlder.handleError(err)));
    }

    post(url: string, payload): Observable<any> {

        return this.http.post(url, payload)
            .pipe(map(this.extractData))
            .pipe(catchError(err => this.globalHTTPErrorHanlder.handleError(err)));
    }

    // update the entire payload
    put(url: string, payload): Observable<any> {

        return this.http.put(url, payload)
            .pipe(map(this.extractData))
            .pipe(catchError(err => this.globalHTTPErrorHanlder.handleError(err)));
    }

    // update the few properties of the payload
    patch(url: string, payload): Observable<any> {

        return this.http.patch(url, payload)
            .pipe(map(this.extractData))
            .pipe(catchError(err => this.globalHTTPErrorHanlder.handleError(err)));
    }


    delete(url: string): Observable<any> {
        return this.http.delete(url)
            .pipe(map(res => res))
            .pipe(catchError(err => this.globalHTTPErrorHanlder.handleError(err)));
    }


    private extractData(res: any) {
        return res || {};
    }
}
