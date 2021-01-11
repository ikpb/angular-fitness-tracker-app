import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

     loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', {validators:[Validators.required]}),
    })

  }
  onSubmit(){
    this.authService.login(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
    );
  }
  get email(){return this.loginForm.get('email'); }
  get password(){ return this.loginForm.get('password');}

}
