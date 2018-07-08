import {AppError} from './app-error';


// this class derived from App Error because Not Found Error is a kind of Application Error
export class NotFoundError extends AppError {
    // will all handle in ErrorHandler class
}
