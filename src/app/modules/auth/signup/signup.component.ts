import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  submitted = false;
  success = false;
  messageForm: FormGroup;

  user: User = new User();
  
  constructor(private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.minLength(4)]],
    });
   }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(this.user)
  }

}
