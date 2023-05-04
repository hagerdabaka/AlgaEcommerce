import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/carts/cart.service';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent  implements OnInit{

 
  id:any;
  data:any = [];
  isLoading:boolean = false;
  toQuantity :boolean=true;
  addedCart:any[] = []
  @Output() items = new EventEmitter()

  // toQuantity:boolean = false;
  // quantity:number = 0




  // sendData(){
  //   this.items.emit({item:this.data, quantity:this.quantity})
  // }

  constructor(private serve:SharedServicesService , private _active:ActivatedRoute , private cartService:CartService){}
  ngOnInit(): void {
    
    this.id =this._active.snapshot.paramMap.get("id");
    this.getProductID();
   // add to cart

    this.data.forEach((a:any) => {
      Object.assign(a,{quantity:1,total:a.price});
    });
    console.log(this.data)
  }

 // PRODUCT DETAILES 
  getProductID(){
    this.isLoading=true;
    this.serve.getProductById(this.id).
    subscribe((res :any)=>{
      console.log(res);
      this.data=res;
      this.isLoading=false;
    });
  }

  // ADD TO CART 
  addtocart(item:any){
  this.cartService.addtoCart(item) ;

  }
  
 // A D D    P R O D U C T S   T O   C A R T S
  // addtocart(e:any){
  //   if(this.addedCart.find(items => items.items.id == e.items.id)) {
  //     swal.fire({
  //       title:'Error',
  //       text:"You already added this item before",
  //       icon:'error'
  //     })
  //   } else{
  //     this.addedCart.push(e)
  //     swal.fire({
  //       title:'Success',
  //       text:"product successfully added to the cart",
  //       icon:'success'
  //     })
  //   }
      
  //       localStorage.setItem('addedToCart', JSON.stringify(this.addedCart))
  //     }
    
}
