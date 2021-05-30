import { Component } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'kolbein-v3-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent {
  constructor(readonly usersService: UsersService) {}
  section: Section = 'general';
}

type Section = 'general' | 'socials' | 'challenges' | 'actions';
