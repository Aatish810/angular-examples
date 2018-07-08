import { Injectable, Injector, OnInit } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';



@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    public uploadFlag = false;
    constructor(
        injector: Injector,
        private authService: AuthService) {
        this.authService = injector.get(AuthService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated() && this.uploadFlag) {
            const authHeader = this.authService.getAuthToken();
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authHeader}`) });
            req = req.clone({ headers: req.headers.set('Accept', '*/*') });
            req = req.clone({ headers: req.headers.set('enctype', 'multipart/form-data') });
        } else if (this.authService.isAuthenticated()) {
            const authHeader = this.authService.getAuthToken();
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authHeader}`) });
            req = req.clone({ headers: req.headers.set('Accept', '*/*') });
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        } else {
            req = req.clone({ headers: req.headers.set('Accept', '*/*') });
        }
        const started = Date.now();
        return next
            .handle(req)
            .do(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    const statisticks = `Request for ${req.urlWithParams} took ${elapsed} ms.`;
                    console.log('%c LATENCY INFO !!! ', 'background: #5bc0de; color: #FFF', statisticks);
                }
            });
    }
}
