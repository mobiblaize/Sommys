import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  backend = 'http://localhost:3001/';
  authToken: any;
  user: any;

  loadToken() {
    const token = localStorage.getItem('a_token');
    this.authToken = token;
  }

  getPosts():Observable<any> {
    return this.http.get(`${this.backend}posts`);
  }

  sendMessage(message):Observable<any> {
    return this.http.post(`${this.backend}message`, message);
  }

  placeOrder(order):Observable<any> {
    return this.http.post(`${this.backend}order`, order);
  }

  getOrders():Observable<any> {
    return this.http.get(`${this.backend}admin/orders`);
  }

  getMessages():Observable<any> {
    return this.http.get(`${this.backend}admin/messages`);
  }

  searchOrders(query):Observable<any> {
    return this.http.post(`${this.backend}admin/orders/search`, query);
  }

  deliverOrder(order):Observable<any> {
    return this.http.post(`${this.backend}admin/orders/delivered`, order);
  }

  searchMessages(query):Observable<any> {
    return this.http.post(`${this.backend}admin/messages/search`, query);
  }

  getProfile():Observable<any> {
    return this.http.get(`${this.backend}admin`);
  }

  adminLogin(user):Observable<any> {
    return this.http.post(`${this.backend}admin/login`, user);
  }
  adminRegister(user):Observable<any> {
    return this.http.post(`${this.backend}admin/register`, user);
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
    return localStorage.getItem('token');
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
