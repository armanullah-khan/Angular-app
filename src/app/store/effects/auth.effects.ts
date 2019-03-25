import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
  SignUp, SignUpSuccess, SignUpFailure
} from '../actions/auth.actions';
import { ApiResponse } from 'src/app/models/api-response';
import { User } from 'src/app/models/user';



@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<User> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
        .map((user) => {
          console.log('effects user',user, payload)
          return new LogInSuccess({token: user.token, email: payload.email});
        })
        .catch((error) => {
          return Observable.of(new LogInFailure({ error: error }));
        });
    });


  @Effect({ dispatch: false })
  LogInSuccess: Observable<ApiResponse> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user: ApiResponse) => {
      console.log('user payload',user)
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<ApiResponse> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
  );

  @Effect()
  SignUp: Observable<User> = this.actions
    .ofType(AuthActionTypes.SIGNUP)
    .map((action: SignUp) => action.payload)
    .switchMap(payload => {
      return this.authService.signUp(payload.email, payload.password)
        .map((user) => {
          return new SignUpSuccess({token: user.token, email: payload.email});
        })
        .catch((error) => {
          return Observable.of(new SignUpFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  SignUpSuccess: Observable<ApiResponse> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user: ApiResponse) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<ApiResponse> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  public LogOut: Observable<ApiResponse> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );

  @Effect({ dispatch: false })
  GetStatus: Observable<User> = this.actions
    .ofType(AuthActionTypes.GET_STATUS)
    .switchMap(payload => {
      console.log('user payload status',payload)
      return this.authService.getStatus();
    });

}