import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) { }

  login(username:string,password:string){
      if(username=='Anitha' && password=="123456"){
        localStorage.setItem('token','Innowise')
        return true;
      }
      return false;
  }

  logout(){
    localStorage.removeItem('token')
    this.route.navigate([''])
  }

  isLoggedIn(){
    if(localStorage.getItem('token') != null){
      return true;
    }
    return false;
  }
}
