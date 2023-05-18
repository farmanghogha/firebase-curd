import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup;
  submitted:boolean = false;
  constructor(private fb:FormBuilder,private authService:AuthServiceService) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password :['',[Validators.required,Validators.minLength(6)]],
    });
    
  }

  logindata(){
    this.submitted=true;
    if(this.loginform.invalid){
      return; 
    }
    else{
      this.authService.loginuser(this.loginform.value);
      //this.toastr.success('Login successfully....', '');
    }
  }


  get formsValidation(){
    return this.loginform.controls;
 } 
}
