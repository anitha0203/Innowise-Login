import { Component } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  ttt=false
  inputsForm!:FormGroup;
  message=""
  error!:String

  constructor(private fb:FormBuilder, private auth: AuthService, private route: Router){}

  ngOnInit(): void {

    this.inputsForm=this.fb.group({
      UserNameOrEmail: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]{3,30}$")]],
      Password: ['',[Validators.required,Validators.minLength(6)]],
      EnvironmentID: ['',[Validators.required]]
    });

  }

  get regCard() {
    return this.inputsForm.controls;
  }

  save(){
    this.isFormSaved = true;
    if (this.inputsForm.invalid) {
    return;
    }

    for(var i=0;i<this.envselect.length;i++){
      if(this.envselect[i].organizationEnvironmentName == this.inputsForm.value.EnvironmentID)
      {
        this.inputsForm.value.EnvironmentID = this.envselect[i].organizationEnvironmentId
        break;
      }
    }

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
    }
    )
  }

  clearInput(){
    console.log("input cleared");
    this.inputText = '';

  }

}
