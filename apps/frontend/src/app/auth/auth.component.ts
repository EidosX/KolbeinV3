import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'kolbein-v3-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit {
  constructor(readonly authService: AuthService) {}
  ngOnInit() {
    this.authService.fetchCode();
  }
}
