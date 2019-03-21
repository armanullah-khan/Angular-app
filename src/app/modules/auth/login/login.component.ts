import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LogIn } from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.state';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  success = false;
  messageForm: FormGroup;

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
    ) {
    this.messageForm = this.formBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',[Validators.required,Validators.minLength(4)]],
    });
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    this.submitted = true;

    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));
    
    console.log(this.user)
    if (this.messageForm.invalid) {
      return;
    }

    this.success = true;
  }
}
