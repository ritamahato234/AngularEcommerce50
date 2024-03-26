import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {signUp} from '../data-type'
import {Router} from '@angular/router'
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private seller:SellerService) { }
  showLogin=false;
  authError:string='';
  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data:signUp): void{
  //  console.warn("seller data in sellerts",data)

  }

  login(data:signUp): void{
    // console.warn("seller data in sellerts",data)
    this.authError="";
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((error)=>{
      if(error){
     this.authError = "Email or password is not correct";
      }
    })
   }

  openLogin(){
this.showLogin = true;
  }

  openSignUp(){
this.showLogin = false;

  }
}
