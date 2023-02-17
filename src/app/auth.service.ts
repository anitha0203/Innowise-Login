import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router,private http: HttpClient) { }

  postData(username:any): Observable<any> {
    console.log(username)
    var body = {"UserNameOrEmail":username} 
    return this.http.post('https://api.insurance.rahulmitra.dev/master/getuserenvironments',body);
 }

  checkingUser(data:any): Observable<any> {
    console.log(data)
    return this.http.post('https://api.insurance.rahulmitra.dev/master/authenticate',data)
  }

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
