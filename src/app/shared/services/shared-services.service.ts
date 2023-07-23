import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServicesService {
   
  baseApi='https://fakestoreapi.com/';
  constructor(private http :HttpClient) { }
// PRODUCTS 
  getAllProducts():Observable<any>{
  return  this.http.get(this.baseApi + 'products');
  }
  getProductById(id:any){
    return this.http.get(this.baseApi + `products/${id}`)
  }

  // CATEGORY
  getCategoriesNames(){
    return this.http.get(this.baseApi  + 'products/categories')
  }

  filterCategory(cate:string){
    return this.http.get(this.baseApi + `products/category/${cate}`)
  }
  // Add to Cart 
  postCart(model:any){
    return this.http.post('https://fakestoreapi.com/carts', model)
  }

  //jewelery
  getjewelery(){
    return this.http.get(this.baseApi  + 'products/categories/jewelery')
  }
  //electronics 
  getelectronics(){
    return this.http.get(this.baseApi  + 'products/categories/electronics')
  }

}


