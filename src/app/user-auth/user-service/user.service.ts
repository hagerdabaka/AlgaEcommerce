import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../user.model';


export interface AuthResponseData{
  idToken :string;	
  email:string;
  refreshToken:string;
  expiresIn :string;	
  localId :string;	
  registered ? :string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = new BehaviorSubject<User>(null!);
  tokenExpTimer:any;

  constructor(private http :HttpClient , private router :Router) { }


  login(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCVGL_rQA0GV-6tnI21J-PNTGDfOlacjjw',
    {
      email :email,
      password:password,
      returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      );
    })
  );
}

  
  logout(){
    this.user.next(null!);
    this.router.navigate(['./auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpTimer){
      clearTimeout(this.tokenExpTimer)
    }
    this.tokenExpTimer=null;
  }

  autoLogout(expDuration:number){
    console.log(expDuration);
   this.tokenExpTimer= setTimeout(()=>{
    this.logout();
  },expDuration)
  }

  signup(email:string,password:string){
   return this.http.post <AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCVGL_rQA0GV-6tnI21J-PNTGDfOlacjjw',
    {
      email :email,
      password:password,
      returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      );
    })
  );
}

  autologin(){
    const userData :{
       email: string,
       id: string,
       _token: string,
       _tokenExpirationDate: Date
        } = JSON.parse(localStorage.getItem('userData')|| '{}');
    if(!userData){
      return ;
    }
    const loadUesr= new User 
    (userData.email,userData.email,userData._token,new Date(userData._tokenExpirationDate));
    if(loadUesr.token){
      this.user.next(loadUesr);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }
  
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000); 
    localStorage.setItem('userData',JSON.stringify(user));
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
  
  }


