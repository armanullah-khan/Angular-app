import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { NavComponent } from './components/nav/nav.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthEffects } from './store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.state';
import { StatusComponent } from './components/status/status.component';
import { TokenInterceptor, ErrorInterceptor } from './services/token.interceptor';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    StatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(reducers, {}),
  ],
  providers: [ 
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
