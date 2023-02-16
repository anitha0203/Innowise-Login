import { Component } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  inputsForm!:FormGroup;
  message=""
  dataa  = {username:"Anitha", password:"123456"}
  constructor(private fb:FormBuilder, private auth: AuthService, private route: Router){}

  ngOnInit(): void {

    this.inputsForm=this.fb.group({
      username: ['',[Validators.required,Validators.pattern("^[a-zA-Z0-9 ]{1,30}$")]],
      password: ['',[Validators.required,Validators.minLength(6)]]
    });

  }

  get regCard() {
    return this.inputsForm.controls;
  }
  isFormSaved = false;
  save(){
    this.isFormSaved = true;
    if (this.inputsForm.invalid) {
    return;
    }
    var val = this.auth.login(this.inputsForm.value.username,this.inputsForm.value.password)
    if(val)
      this.route.navigate(['home'])
    else
      this.message = "Wrong Credientials"
    console.log("form", this.inputsForm.value)
   // window.location.reload();
  }

}
