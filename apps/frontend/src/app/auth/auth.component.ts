import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'kolbein-v3-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: '*' })),
      ]),
    ]),
  ],
})
export class AuthComponent implements OnInit {
  constructor(readonly authService: AuthService) {}
  ngOnInit() {
    this.authService.fetchTwitchAuthCode();
  }
}
