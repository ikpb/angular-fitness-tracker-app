import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
@Output() closeSideNav = new EventEmitter<void>();
isAuth=false;
authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
this.authSubscription = this.authService.authChange.subscribe(authStatus=>{
  this.isAuth=authStatus;
});
  }
  
  onClickToggle(){
    this.closeSideNav.emit();
  }
  onLogout(){
    this.onClickToggle();
    this.authService.logout();
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
