import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    url = 'https://insurance-api01.suvamglobal.com/master/'

    constructor(private route: Router,private http: HttpClient) { }

    postData(username:any): Observable<any> {
      console.log(username)
      var body = {"UserNameOrEmail":username} 
      return this.http.post(this.url+'getuserenvironments',body);
  }

    checkingUser(data:any): Observable<any> {
      console.log(data)
      return this.http.post(this.url+'authenticate',data)
    }

    checkingMaster(data:any): Observable<any> {
      console.log(data)
      return this.http.post(this.url+'authenticatemaster',data)
    }

    logout(){
      localStorage.removeItem('token')
      this.route.navigate([''])
    }

    d = ''

    async getDataa(token:any){
      await fetch('https://insurance-api01.suvamglobal.com/master/testauth', {
        method: 'GET',
        headers: {
          'Authorization': token
        },
      })
      .then((response) =>{
          this.d = response.statusText
      })
      return this.d
    }
}
