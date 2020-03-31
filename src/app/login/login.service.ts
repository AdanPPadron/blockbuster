import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlEndoPoint:string = 'http://localhost:8090/companias';

  credentials:any;

  constructor() { }

  save(credentials:any):void{
   localStorage.setItem('AuthToken',btoa(`${this.credentials.username}:${this.credentials.password}`));
  }

  getAuthHeaders(): HttpHeaders{
    let token = localStorage.getItem('AuthToken');
    if(!token){
      return null;
    }else{
      return new HttpHeaders({'Authorization': 'Basic'+token});
    }

    
  }
}
