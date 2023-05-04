import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authServ :UserService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authServ.user.pipe(
      take(1),exhaustMap(user=>{
        if(!user){
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth',user.token)
        })
        return next.handle(req);
      })
    )
    
  }
}

