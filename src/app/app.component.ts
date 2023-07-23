import { Component, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'algaShop';

  // isDark=false;
  // @Input() modeToggle(){
  //   this.isDark=!this.isDark;
  //   document.documentElement.setAttribute("data-theme",this.isDark ?'dark' :'light')
  // }
  // @HostBinding('modeclass') 
  // get themeMode(){
  //   return this.isDark ?'theme-dark' : 'theme-light';
  // }

}
