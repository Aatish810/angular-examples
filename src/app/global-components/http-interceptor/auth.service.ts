import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    //
    isAuthenticated() {
        return false;
    }

    getAuthToken() {
        return 'some token';
    }
}
