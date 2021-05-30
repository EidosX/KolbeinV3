import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './users/user/user.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: 'auth', component: AuthComponent },
        { path: 'users/:userId', component: UserComponent },
      ],
      {
        initialNavigation: 'enabled',
      }
    ),
    AuthModule,
    BrowserAnimationsModule,
    UsersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
