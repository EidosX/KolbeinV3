import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'kolbein-v3-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.sass'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('450ms 100ms ease-in', style({ opacity: '*' })),
      ]),
    ]),
  ],
})
export class CodeComponent {
  constructor(readonly authService: AuthService) {}
}
