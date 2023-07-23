import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  
// owl-carousel
customOptions: OwlOptions = {
  loop: true,
  touchDrag: false,
  rtl:true,
  autoplay:true,
  autoplayTimeout:800,
  autoplayHoverPause:true,
  
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 1
    },
    940: {
      items: 1
    }
  },

}

}
