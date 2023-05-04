import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import swal from 'sweetalert2';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent  implements OnInit{


  public products : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

}

// cartItems:any = []
//   success:boolean = false
//   constructor(private _cartService:CartService, private _sharedService:SharedServicesService) { }

//   addAmount(i:any) {
//     this.cartItems[i].quantity++;
//     this.getTotalPrice()

//     localStorage.setItem('addedToCart',JSON.stringify(this.cartItems))

//   }

//   minusAmount(i:any) {
//     if (this.cartItems[i].quantity != 1) {
//       this.cartItems[i].quantity--
//     }
//     this.getTotalPrice()
//     localStorage.setItem('addedToCart',JSON.stringify(this.cartItems))
//   }


//   deleteItem(i:any){
//     this.cartItems.splice(i, 1)

//     this.getTotalPrice()
//     localStorage.setItem('addedToCart',JSON.stringify(this.cartItems))
//   }

//   clearAllData() {
//     this.cartItems = []

//     this.getTotalPrice()
//     localStorage.setItem('addedToCart',JSON.stringify(this.cartItems))
//   }

//   // CALCULATE  TOTAL  PRICE  OF  ALL  PRODUCTS
//   total:any = 0
//   getTotalPrice(){
//     this.total = 0;
//     for (let i = 0; i < this.cartItems.length; i++) {
//     this.total += this.cartItems[i].item.price * this.cartItems[i].quantity
//     }
//   }

  
//   updateOnChange() {
//     this.getTotalPrice()
//     localStorage.setItem('addedToCart',JSON.stringify(this.cartItems))
//   }


//   // S E N D   O R D E R   
//    pushCart(){
//     let productsDetails = this.cartItems.map(x => {
//       return {productId:x.item.id, quantity:x.quantity }
//     })
    
//     let pushModel = {
//       userId:5,
//       date:new Date(),
//       products:productsDetails
//     }

//     this._cartService.postCart(pushModel).subscribe(res => {
//       swal.fire({
//         title:'success',
//         text:'Your order is successfully send ',
//         icon:'success'
//       })

//       this.cartItems = []
//       this.getTotalPrice()
//       localStorage.setItem('addedToCart',JSON.stringify(this.cartItems))
//     })
//    }


//   ngOnInit(): void {
//     //Get added products from localstorage
//     if(localStorage.getItem('addedToCart') != null) {
//     this.cartItems = JSON.parse(localStorage.getItem('addedToCart') || '')
//     }
//     this.getTotalPrice()
//    }

// }
