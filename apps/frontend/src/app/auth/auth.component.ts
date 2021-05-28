import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'kolbein-v3-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent {
  constructor(readonly authService: AuthService) {}

  code$ = new BehaviorSubject<string | null>('C9KP');
}
