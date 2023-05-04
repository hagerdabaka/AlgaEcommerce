import { Component, OnDestroy ,ComponentFactoryResolver ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertComponent } from 'src/app/shared/component/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { AuthResponseData, UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnDestroy {
 
  constructor(private userServe:UserService , private router:Router , 
  private componentFactoryResolver: ComponentFactoryResolver ){}

  isLoadingMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost : PlaceholderDirective;
  private closeSub :Subscription;

  onSwitchMode() {
    this.isLoadingMode = !this.isLoadingMode;
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    let authObs : Observable<AuthResponseData>;

    this.isLoading = true
    if (this.isLoadingMode) {
      authObs = this.userServe.login(email, password) 
    }
    else {
        authObs = this.userServe.signup(email, password)
      }
      authObs.subscribe(resp => {
        this.isLoading = false;
        this.router.navigate(['./recipes']);
        console.log(resp);
        errorMessage => {
          this.isLoading = false;
          this.error='An Error Accured';
          console.log(errorMessage);
          this.error = errorMessage;
        }
      })
      form.reset();

    }
    
  onHandleError() {
    this.error = null;
  }
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
