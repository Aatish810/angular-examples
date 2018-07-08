import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { GlobalHTTPErrorHanlder } from '../global-error-handler/global-error-handler';


@Injectable()
export class HTTPCommonService {

    constructor(private http: HttpClient, private globalHTTPErrorHanlder: GlobalHTTPErrorHanlder) { }

    get(url: string): Observable<any> {
        return this.http.get(url)
            .map(res => this.extractData(res))
            .catch(err => this.globalHTTPErrorHanlder.handleError(err));
    }

    post(url: string, payload): Observable<any> {

        return this.http.post(url, payload)
            .map(this.extractData)
            .catch(err => this.globalHTTPErrorHanlder.handleError(err));
    }

    // update the entire payload
    put(url: string, payload): Observable<any> {

        return this.http.put(url, payload)
            .map(this.extractData)
            .catch(err => this.globalHTTPErrorHanlder.handleError(err));
    }

    // update the few properties of the payload
    patch(url: string, payload): Observable<any> {

        return this.http.patch(url, payload)
            .map(this.extractData)
            .catch(err => this.globalHTTPErrorHanlder.handleError(err));
    }


    delete(url: string): Observable<any> {
        return this.http.delete(url)
            .map(res => res)
            .catch(err => this.globalHTTPErrorHanlder.handleError(err));
    }


    private extractData(res: any) {
        return res || {};
    }
}
