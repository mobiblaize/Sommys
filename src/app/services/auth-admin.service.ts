import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  constructor( private http: HttpClient ) { }

  backend = `${environment.BaseUrl}`;
  authToken: any;
  user: any;

  loadToken() {
    const token = localStorage.getItem('a_token');
    this.authToken = token;
  }

  addPost(formData) {
    return this.http.post<any>(`${this.backend}admins/post/add`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  editPost(formData) {
    return this.http.post<any>(`${this.backend}admins/post/edit`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  getPost(post):Observable<any> {
    return this.http.post(`${this.backend}admins/post`, post );
  }

  getPosts():Observable<any> {
    return this.http.get(`${this.backend}posts` );
  }

  deletePost(post):Observable<any> {
    return this.http.post(`${this.backend}admins/post/delete`, post, );
  }

  getOrders(size):Observable<any> {
    return this.http.get(`${this.backend}admins/orders`, size );
  }

  getMessages(size):Observable<any> {
    console.log(this.backend);
    return this.http.get(`${this.backend}admins/messages`, size );
  }

  searchOrders(query):Observable<any> {
    return this.http.post(`${this.backend}admins/orders/search`, query, );
  }

  deliverOrder(order):Observable<any> {
    return this.http.post(`${this.backend}admins/orders/delivered`, order, );
  }

  searchMessages(query):Observable<any> {
    return this.http.post(`${this.backend}admins/messages/search`, query, );
  }

  getProfile():Observable<any> {
    return this.http.get(`${this.backend}admins`, );
  }

  adminLogin(user):Observable<any> {
    return this.http.post(`${this.backend}admins/login`, user );
  }
  adminRegister(user):Observable<any> {
    return this.http.post(`${this.backend}admins/register`, user, );
  }

  loggedIn() {
    this.loadToken();
    try {
      const helper = new JwtHelperService();
      return !helper.isTokenExpired(this.authToken);
    } catch (err) {
      this.logOut()
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('a_token');
  }

  storeUserData (token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
