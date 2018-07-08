import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NoopInterceptor } from './global-components/http-interceptor/app-httpinterceptor.service';
import { HTTPCommonService } from './global-components/http-interceptor/app-http-common.service';
import { GlobalErrorHandler, GlobalHTTPErrorHanlder } from './global-components/global-error-handler/global-error-handler';
import { AuthService } from './global-components/http-interceptor/auth.service';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    HttpModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [HTTPCommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    GlobalHTTPErrorHanlder,
    GlobalErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
