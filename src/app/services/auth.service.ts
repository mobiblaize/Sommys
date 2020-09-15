import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  authToken: any;
  user: any;

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  sendMessage(message):Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/message', message, {headers});
  }

  placeOrder(order):Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/order', order, {headers});
  }

  getOrders():Observable<any> {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3001/admin/orders', {headers});
  }

  getMessages():Observable<any> {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3001/admin/messages', {headers});
  }

  searchOrders(query):Observable<any> {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/admin/orders/search', query, {headers});
  }

  searchMessages(query):Observable<any> {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/admin/messages/search', query, {headers});
  }

  getProfile():Observable<any> {
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3001/admin', {headers});
  }

  adminLogin(user):Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/admin/login', user, {headers});
  }
  adminRegister(user):Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3001/admin/register', user, {headers});
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
