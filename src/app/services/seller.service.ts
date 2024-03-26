import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signUp } from '../data-type';
import {login} from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// import { EventEmitter } from 'stream';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);



  constructor(private http: HttpClient, private router: Router) {}
  userSignUp(data: signUp) {
    // console.warn('service called');
    return this.http
      .post('http://localhost:3000/seller', data, { observe: 'response' })
      .subscribe((result) => {
        // console.warn('result: ', result);
        if (result) {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }
      });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  isLoginError = new EventEmitter<boolean>(false);
  userLogin(data:login){
    console.warn('service file',data)
    //api call
    return this.http
    .get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, 
     { observe: 'response' })
    .subscribe((result:any) => {
      console.warn('result: ', result);
      if(result && result.body && result.body.length){
        console.warn("user logged in ")
        localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
      }else{
        console.warn('login failed');
        this.isLoginError.emit(true)
      }
    });
  }


}
