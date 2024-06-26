import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  sellerName: string = '';
  searchResult: undefined | product[];
  userName:string="";
  cartItems = 0; 
  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        //  console.warn('value=',val.url);
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.warn('in seller area');
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else if(localStorage.getItem('user')){
          let userStore=localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name
          this.menuType='user';
          this.product.getCartList(userData.id)
        } 
        else {
          // console.warn('outside seller area');
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
     this.cartItems = JSON.parse(cartData).length; 
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length;
      console.log(this.cartItems);
    })
  }
  
  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLTextAreaElement;
      // console.warn('element==',element.value)
      this.product.searchProducts(element.value).subscribe((data) => {
        // console.warn(data);
        if (data.length > 5) {
          data.length = 5;
        }
        this.searchResult = data;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }
  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id]);
  }
  submitSearch(val:string){
// console.warn("jgu",val)
  this.route.navigate([`search/${val}`])
  }
}
