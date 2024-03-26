import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';


@Injectable({
  providedIn: 'root'
})
export class UserService {
invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
userSignup(user:signUp){
// console.warn(user);
this.http.post("http://localhost:3000/users",user,{observe:'response'})
.subscribe((result)=>{
  console.warn("resulut234",result);
  if(result){
    localStorage.setItem('user',JSON.stringify(result.body))
    this.router.navigate(['/'])
  }
})

}

userLogin(data:login){
this.http.get<signUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
{observe:"response"})
.subscribe((result )=>{
  if(result && result.body?.length){
  // this.invalidUserAuth.emit(false)

console.warn("userlogin result fgfgfgb hnj thnb",result);
let setlocal = localStorage.setItem('user',JSON.stringify(result.body[0]));
console.log("setlocal",setlocal)
  this.router.navigate(['/'])
  this.invalidUserAuth.emit(false)
  }else{
    this.invalidUserAuth.emit(true);
  }
})
}

userAuthReload(){
  if(localStorage.getItem('user')){
   console.log("userAuthReload result")
    this.router.navigate(['/'])
  }
}

}
