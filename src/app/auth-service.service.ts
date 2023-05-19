import { Injectable } from '@angular/core';
import { IUser } from './Fiebase/IUser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  users=new BehaviorSubject<IUser>(null);

  constructor(
    private fa:AngularFireAuth,
    public router: Router,
    private toastr: ToastrService
     ) {
    
   }
  
  registerUser(user:IUser){
     this.fa.createUserWithEmailAndPassword(user.email,user.password).then((val)=>{
        if(val){
          this.toastr.success('registered successfully....', '');
          this.router.navigate(['/login']);
        }
     }).catch((error)=>{
      if(error.code=='auth/email-already-in-use'){
        this.toastr.error('Registration failed....', 'Account Already Exists.....');
      }
     });

  }
  
  loginuser(user:IUser){
    
    this.fa.signInWithEmailAndPassword(user.email,user.password).then((res:any)=>{
      if(res){
         debugger;
        localStorage.setItem("user",res.user.multiFactor.user.accessToken);
        //sessionStorage.setItem("user",res.user.multiFactor.user.accessToken);
        this.toastr.success('Login successfully....', '');
      //  this.users=new BehaviorSubject<IUser>(user);
        this.users.next(user);
        this.router.navigate(['/curd']);     
             
      }
    }).catch((error)=>{
      debugger;
      if(error.code=='auth/user-not-found'){
        this.toastr.error('Login failed....', 'Invalid Email..');
      }    
      else{
        this.toastr.error('Login failed....', 'Invalid Password..');
      }
    });
  }

  logoutUser(){
     this.fa.signOut().then(()=>{
      localStorage.removeItem("user");
      //sessionStorage.removeItem("user");
       this.router.navigate(['/login']);
     });
  }

 
}
