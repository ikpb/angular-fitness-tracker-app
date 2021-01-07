import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

     loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', {validators:[Validators.required]}),
    })

  }
  onSubmit(){
    console.log(this.loginForm)
  }
  get email(){return this.loginForm.get('email'); }
  get password(){ return this.loginForm.get('password');}

}
