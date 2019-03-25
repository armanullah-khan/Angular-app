export class User {
 //action payload
  id?: string;
  email?: string;
  password?: string;
  token?: string;
 
 //effect login payload
  payload?: {
    password?: string;
    email?: string;
  };

  //dispating failure action
  error?:object;
}