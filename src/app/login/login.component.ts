import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
<<<<<<< HEAD
=======
  inputText!: string;
  envselect: any
  setApi=false;
  isFormSaved1 = false;
  isFormSaved = false;
  isFormSaved2 = false;
  ttt=false
  inputsForm!:FormGroup;
  message=""
  error!:String

  constructor(private fb:FormBuilder, private auth: AuthService, private route: Router){}
>>>>>>> 4aff13c9bbc1f5c6c62a306be92f5e2c8b504f19

    inputText!: string;
    envselect: any
    setApi=false;
    isFormSaved1 = false;
    isFormSaved = false;
    isFormSaved2 = false;
    inputsForm!:FormGroup;
    error!:String

    constructor(private fb:FormBuilder, private auth: AuthService, private route: Router){}

<<<<<<< HEAD
    ngOnInit(): void {
      this.inputsForm=this.fb.group({
        UserNameOrEmail: ['',[Validators.required,Validators.maxLength(30)]],
        Password: ['',[Validators.required,Validators.minLength(6)]],
        EnvironmentID: ['',[Validators.required]]
      });
=======
  }

  get regCard() {
    return this.inputsForm.controls;
  }

  save(){
    this.isFormSaved = true;
    if (this.inputsForm.invalid) {
    return;
>>>>>>> 4aff13c9bbc1f5c6c62a306be92f5e2c8b504f19
    }

    //      Validating the input fields
    get regCard() {
      return this.inputsForm.controls;
    }

    save(){
      //      checking the form is valid or not
      this.isFormSaved = true;
      if (this.inputsForm.invalid) {
      return;
      }

      //      changed the environment name to environment id
      for(var i=0;i<this.envselect.length;i++){
        if(this.envselect[i].organizationEnvironmentName == this.inputsForm.value.EnvironmentID)
        {
          this.inputsForm.value.EnvironmentID = this.envselect[i].organizationEnvironmentId
          break;
        }
      }

      //      checking the login details using services
      this.auth.checkingUser(this.inputsForm.value).subscribe((response)=>{
        this.route.navigate(['/home'])
      },(error: HttpErrorResponse) => {
        this.error = (error.error.message);
      })
    }

<<<<<<< HEAD
    //      validating the password using regx
    checkPassword(){
      this.error=''
      this.isFormSaved2 = true;
      if(this.regCard['password'].errors)
      return;
    }

    //      validating the username using regx and getting the environment data
    checkApi(){
      this.envselect =[]
      this.error=''
      this.isFormSaved1 = true;
      if(this.regCard['UserNameOrEmail'].errors)
      return;
      this.auth.postData(this.inputsForm.value.UserNameOrEmail).subscribe((response)=>{
        this.envselect =response
      },(error: HttpErrorResponse) => {
        this.error = (error.error.message);
      }
      )
=======
    this.auth.checkingUser(this.inputsForm.value).subscribe((response)=>{
      console.log(response);
      
    },(error: HttpErrorResponse) => {
      this.error = (error.error.message);
    }
    )
  }

  checkPassword(){
    this.error=''
    this.isFormSaved2 = true;
    if(this.regCard['password'].errors)
    return;
  }

  checkApi(){
    this.ttt = false
    this.envselect =[]
    this.error=''
    this.isFormSaved1 = true;
    if(this.regCard['UserNameOrEmail'].errors)
    return;
    this.auth.postData(this.inputsForm.value.UserNameOrEmail).subscribe((response)=>{
      this.envselect =response
      console.log(this.envselect);
      this.ttt = true
    },(error: HttpErrorResponse) => {
      this.error = (error.error.message);
>>>>>>> 4aff13c9bbc1f5c6c62a306be92f5e2c8b504f19
    }

<<<<<<< HEAD
    //      clear the input field data
    clearInput(){
      this.envselect =[]
      this.error=''
      this.inputText = '';
    }
=======
  clearInput(){
    console.log("input cleared");
    this.inputText = '';

  }
>>>>>>> 4aff13c9bbc1f5c6c62a306be92f5e2c8b504f19

}
