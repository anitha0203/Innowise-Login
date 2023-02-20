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

    inputText!: string;
    envselect: any
    setApi=false;
    isFormSaved1 = false;
    isFormSaved = false;
    isFormSaved2 = false;
    inputsForm!:FormGroup;
    error!:String
    color=false

    constructor(private fb:FormBuilder, private auth: AuthService, private route: Router){}

    ngOnInit(): void {
      this.inputsForm=this.fb.group({
        UserNameOrEmail: ['',[Validators.required,Validators.maxLength(30)]],
        Password: ['',[Validators.required,Validators.minLength(6)]],
        EnvironmentID: ['',[Validators.required]]
      });
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
        localStorage.setItem('token','Innowise')
        this.route.navigate(['/home'])
      },(error: HttpErrorResponse) => {
        this.error = (error.error.message);
        this.isFormSaved = false;
      })
    }

    //      validating the password using regx
    checkPassword(){
      this.error=''
      this.isFormSaved2 = true;
      if(this.regCard['Password'].errors)
      return;
    }

    //      validating the username using regx and getting the environment data
    checkApi(){
      this.color=false
      this.envselect =[]
      this.error=''
      this.isFormSaved1 = true;
      if(this.regCard['UserNameOrEmail'].errors)
      return;
      this.auth.postData(this.inputsForm.value.UserNameOrEmail).subscribe((response)=>{
        this.envselect =response
        this.color=true
      },(error: HttpErrorResponse) => {
        this.error = (error.error.message);
      }
      )
    }

    //      clear the input field data
    clearInput(){
      this.envselect =[]
      this.error=''
      this.inputText = '';
    }

}
