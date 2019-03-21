import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.state';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  getState: Observable<any>;
  isAuthenticated: false;
  
  appTitle: string = 'Angular App';
  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
   }


  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });
  }

}
