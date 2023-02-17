import { Component } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  inputText!: string;

  envselect: any

  inputsForm!:FormGroup;
  message=""
  dataa  = {username:"Anitha", password:"123456"}
  constructor(private fb:FormBuilder, private auth: AuthService, private route: Router){}

  ngOnInit(): void {

    this.inputsForm=this.fb.group({
      username: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]{3,30}$")]],
      password: ['',[Validators.required,Validators.minLength(6)]],
      environment: ['',[Validators.required]]
    });

  }


  get regCard() {
    return this.inputsForm.controls;
  }
  setApi=false;
  isFormSaved1 = false;
  isFormSaved = false;
  ttt=false
  save(){
    this.isFormSaved = true;
    if (this.inputsForm.invalid) {
    return;
    }
    var val = this.auth.login(this.inputsForm.value.username,this.inputsForm.value.password)
    if(val)
    {
      this.route.navigate(['home'])
    }
    else
      this.message = "Wrong Credientials"
    console.log("form", this.inputsForm.value)
  }

  checkApi(){
    this.isFormSaved1 = true;
    if(this.regCard['username'].errors)
    return;
    this.auth.postData(this.inputsForm.value.username).subscribe((response)=>{
      this.envselect =response
      console.log(this.envselect);

    })
    console.log("first",this.inputsForm.value.username);
    if(this.inputsForm.value.password)
    this.ttt = true
  }

  clearInput(){
    console.log("input cleared");
    this.inputText = '';
  }



}
