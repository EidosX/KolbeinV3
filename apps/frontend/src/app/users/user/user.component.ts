import { Component } from '@angular/core';

@Component({
  selector: 'kolbein-v3-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent {
  section: Section = 'general';
}

type Section = 'general' | 'socials' | 'challenges' | 'actions';
