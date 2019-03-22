import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';


export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    SIGNUP = '[Auth] Signup',
    SIGNUP_SUCCESS = '[Auth] Signup Success',
    SIGNUP_FAILURE = '[Auth] Signup Failure',
    LOGOUT = '[Auth] Logout',
    GET_STATUS = '[Auth] GetStatus'
  }
  
  export class LogIn implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: User) {
      console.log('action Login', payload)
    }
  }
  
  export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: User) {
      console.log('action success', payload) 
    }
  }
  
  export class LogInFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) {
      console.log('action failure', payload)
    }
  }
  
  export class SignUp implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: User) {
      console.log('action signup', payload)
    }
  }
  
  export class SignUpSuccess implements Action {
    readonly type = AuthActionTypes.SIGNUP_SUCCESS;
    constructor(public payload: User) {
      console.log('action sign success', payload)
    }
  }
  
  export class SignUpFailure implements Action {
    readonly type = AuthActionTypes.SIGNUP_FAILURE;
    constructor(public payload: any) {
      console.log('action sign fail', payload)
    }
  }
  
  export class LogOut implements Action {
    readonly type = AuthActionTypes.LOGOUT;
  }
  
  export class GetStatus implements Action {
    readonly type = AuthActionTypes.GET_STATUS;
  }
  
  export type All =
    | LogIn
    | LogInSuccess
    | LogInFailure
    | SignUp
    | SignUpSuccess
    | SignUpFailure
    | LogOut
    | GetStatus;