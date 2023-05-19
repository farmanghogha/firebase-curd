import { Injectable } from '@angular/core';
import { IUser } from './Fiebase/IUser';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  islogin:boolean=false;
  constructor(private fa:AngularFireAuth, public router: Router,private toastr: ToastrService) {
    
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
    this.fa.signInWithEmailAndPassword(user.email,user.password).then((res)=>{
      if(res){
        this.islogin=true;
        sessionStorage.setItem("email",user.email);
        this.toastr.success('Login successfully....', '');
        this.router.navigate(['/curd']);
        this.islogin=true;
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
      this.islogin=false;
      sessionStorage.removeItem("email");
       this.router.navigate(['/login']);
     });
  }

  checklogin(){
    return this.islogin;
  }
}
