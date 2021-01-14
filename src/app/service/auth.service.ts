import { Subject } from 'rxjs';

import { User } from '../model/user.model';
import { AuthData } from '../model/auth-data.model';
import { Injectable, resolveForwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { TrainingService } from './training.service';
import { MatSnackBar } from'@angular/material/snack-bar' 
import { UIService } from '../shared/ui.service';
 
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, 
    private afAuth: AngularFireAuth, 
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UIService){}

  initAuthListener(){
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.isAuthenticated =true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }else{
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;

      }
    });
  }
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth
    .createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      this.uiService.loadingStateChanged.next(false);
      console.log(result)
    }).catch(error =>{
      this.uiService.loadingStateChanged.next(false);
      this.snackBar.open(error.message, null,{
        duration:3000
      });
    })
    
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth
    .signInWithEmailAndPassword(authData.email,authData.password)
    .then(result=>{
      this.uiService.loadingStateChanged.next(false);
      console.log(result)
    }).catch(error=>{
      this.uiService.loadingStateChanged.next(false);
      this.snackBar.open(error.message, null,{
        duration: 3000
      });
    })
    
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
