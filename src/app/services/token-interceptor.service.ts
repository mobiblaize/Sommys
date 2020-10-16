import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthAdminService } from './auth-admin.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthAdminService) { }
  
  intercept(req, next) {
    // let authAdminService = this.injector.get(AuthAdminService);
    let authToken = this.authService.getToken();
    
    if (authToken !== null ) {
      let tokenizedReq = req.clone ({
        setHeaders: {
          Authorization: authToken
        }
      });
      return next.handle(tokenizedReq);
    } else {
      let tokenizedReq = req.clone ({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
      return next.handle(tokenizedReq);
    }
  }
}
