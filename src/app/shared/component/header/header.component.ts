import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CartService } from 'src/app/carts/cart.service';
import { UserService } from 'src/app/user-auth/user-service/user.service';
import { SharedServicesService } from '../../services/shared-services.service';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent  implements OnInit {

  public totalItem : number = 0;
  public searchTerm : string;
  isAuthenticated= false;
  private subscribtion:Subscription;

  constructor(private serve :SharedServicesService , private cartService :CartService,
    private userServe:UserService ){}

    ngOnDestroy(): void {
      this.subscribtion.unsubscribe();
    }
  
   ngOnInit(): void {
   
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    });

    this.subscribtion=this.userServe.user.subscribe( user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);

    })

  }

  // SEARCH
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  // USER LOGOUT 
  onLogout(){
    this.userServe.logout();
  }

  
  isDark=false;
 modeToggle(){
    this.isDark=!this.isDark;
    document.documentElement.setAttribute("data-theme",this.isDark ?'dark' :'light')
  }
}