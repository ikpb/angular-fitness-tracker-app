import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
maxDate;
  constructor(private authService: AuthService, private uiService: UIService) { }
isLoading = false;
loadingSub: Subscription;
  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe( loadingState =>{
      this.isLoading = loadingState;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }
onSubmit(form: NgForm){
  this.authService.registerUser(
    {
      email: form.value.email,
      password: form.value.password
    }
  );
}
ngOnDestroy(){
this.loadingSub.unsubscribe();
}
}
