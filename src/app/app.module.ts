import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressRouterModule } from 'ngx-progressbar/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import  { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    BlogComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgProgressModule.withConfig({
      spinner: false,
      color: '#3f51b5'
    }),
    NgProgressRouterModule.withConfig({
      delay: 500,
      id: 'myProgress'
    })
  ],
  providers: [AuthService, Title,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptorService, 
      multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
