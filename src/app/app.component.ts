import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo-firebase';
   

  
  constructor(private authService:AuthServiceService,private router:Router){
    
  }
  logoutData(){
    this.authService.logoutUser();
  }
  

isauthonticate(){
 // let data=sessionStorage.getItem("email");
  if(this.authService.users.value!=null ||localStorage.getItem("user")){
    return true;
  }
  else{
    return false;
  }
}

}
