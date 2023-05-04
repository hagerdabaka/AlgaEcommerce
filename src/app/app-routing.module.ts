import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/cart/cart.component';
import { AllProductsComponent } from './product/all-products/all-products.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { BannerComponent } from './shared/component/banner/banner.component';
import { SpinnerComponent } from './shared/component/spinner/spinner.component';
import { UserComponent } from './user-auth/user/user.component';
import { FeatureComponent } from './shared/component/feature/feature.component';

const routes: Routes = [
  {path:'', redirectTo:'products' ,pathMatch:'full'},
  {path:'products',component:AllProductsComponent},
  {path:'details/:id' ,component:ProductDetailsComponent},
  {path : 'cart' , component:CartComponent},
  {path : 'user' , component:UserComponent},
  {path : 'feature' , component:FeatureComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
