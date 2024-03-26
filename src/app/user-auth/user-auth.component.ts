import { Component, OnInit } from '@angular/core';
import {cart, login, product, signUp} from '../data-type'
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin:boolean=true
  authError:string=''
  userId:any
  constructor(private user:UserService,private product:ProductService) { }
 
  ngOnInit(): void {
    this.user.userAuthReload();
    let user:any = localStorage.getItem('user')

    this.userId= user && JSON.parse(user).id;
   
  }

  signUp(data:signUp){
  // console.warn(data)
this.user.userSignup(data)
  }

  login(data:login){
console.warn("login")
this.user.userLogin(data)
this.user.invalidUserAuth.subscribe((result)=>{
  console.warn("apple===========",result)
if(result){
  console.log("not found")
  this.authError = "Please enter valid user details";
}else{
  console.log("else login")
this.localCarttoRemoteCart()
}
})

  }

  openSignup(){
  this.showLogin =false
  }
  
  openLogin(){
    this.showLogin =true

  }

  localCarttoRemoteCart(){
let data = localStorage.getItem('localCart');
let user:any = localStorage.getItem('user')

let userId= user && JSON.parse(user).id;
console.log("user---",JSON.parse(user).id)
if(data){
  let cartDataList = JSON.parse(data)
  // let userId = user && JSON.parse(user).id;
  
  console.log(" apple userId==",userId)
  cartDataList.forEach((product:product,index:any) => {
    let cartData : cart={
      ...product,
    productId:product.id,
    userId,

    }
    delete cartData.id;
   setTimeout(()=>{
    this.product.addtoCart(cartData).subscribe((result)=>{
      if(result){
        console.warn("item stored in db")
      }
    });
  
   },500);
   if(cartDataList.length===index+1){
    localStorage.removeItem('localcart');
  }
  });
}

setTimeout(() => {
  this.product.getCartList(userId)
}, 2000);


  }
}
