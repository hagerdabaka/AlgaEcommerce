import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './product/all-products/all-products.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { SpinnerComponent } from './shared/component/spinner/spinner.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './carts/cart/cart.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MiniDescPipe } from './shared/pipe/mini-desc.pipe';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerComponent } from './shared/component/banner/banner.component';
import { UserComponent } from './user-auth/user/user.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { AlertComponent } from './shared/component/alert/alert.component';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectTrigger } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeatureComponent } from './shared/component/feature/feature.component';




@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    ProductDetailsComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    CartComponent,
    MiniDescPipe,
    BannerComponent,
    UserComponent,
    PlaceholderDirective,
    AlertComponent,
    FeatureComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    CarouselModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
