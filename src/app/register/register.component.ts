import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform:FormGroup;
  submitted:boolean = false;
  constructor(private fb:FormBuilder,private authservice:AuthServiceService,private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.registerform = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password :['',[Validators.required,Validators.minLength(6)]],
     
    });
  }

  registerData(){
    this.submitted=true;
    if(this.registerform.invalid){
      return; 
    }
    else{
     this.authservice.registerUser(this.registerform.value);
    
    }
  }


  get formsValidation(){
    return this.registerform.controls;
 } 
}
