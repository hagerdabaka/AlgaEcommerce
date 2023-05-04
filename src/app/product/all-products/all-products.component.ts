import { Component, OnInit } from '@angular/core';
import { SharedServicesService } from 'src/app/shared/services/shared-services.service';
import swal from 'sweetalert2';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

// owl-carousel
customOptions: OwlOptions = {
  loop: true,
  touchDrag: false,
  rtl:true,
  autoplay:true,
  autoplayTimeout:800,
  autoplayHoverPause:true,
  margin:20,
  dots:false,
 
  responsive: {
    0: {
      items: 1
    },
    300: {
      items: 2
    },
    400: {
      items: 2
    },
    
    740: {
      items: 5
    },
    940: {
      items: 5
    }
  },

}


  constructor(private serve :SharedServicesService){}
  allProduct :any =[] ;
  isLoading:boolean=false;
  cateNames:any = [];
  addedCart:any[] = [];
  searchKey:string ="";

  ngOnInit(): void {
   
    //  this.addedCart = JSON.parse(localStorage.getItem('addedToCart') || '')

    this.AllProducts()
    this.getCateName()
    
  }
  // All Products
  AllProducts(){
  this.serve.getAllProducts().subscribe((res:any)=>{
    console.log(res);
    this.allProduct =res;
  })
  }

   // CATEGORIES NAME 
  getCateName(){
    this.serve.getCategoriesNames().subscribe((res:any) => {
     
      console.log(res);
      this.cateNames = res;
    })
  }

  // FILTER PRODUCTS  INTO CATEGORY 
  filteringProducts(e:any){

    let cate = e.target.value
    this.isLoading = true;
    
    this.serve.filterCategory(cate).subscribe((res:any) =>{
        
      this.allProduct = res
      this.isLoading = false;


      if(cate == 'all') {
        this.serve.getAllProducts().subscribe((res:any) => {
          console.log(res);
          
          this.allProduct = res
      })
      }
    })
  }
    // A D D    P R O D U C T S   T O   C A R T S
    addToCart(e:any){
      if(this.addedCart.find(item => item.item.id == e.item.id)) {
        swal.fire({
          title:'Error',
          text:"You already added this item before",
          icon:'error'
        })
      } else{
        this.addedCart.push(e)
        swal.fire({
          title:'Success',
          text:"product successfully added to the cart",
          icon:'success'
        })
      }
        
          localStorage.setItem('addedToCart', JSON.stringify(this.addedCart))
        }
      
}
