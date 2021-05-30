import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicUser } from '@interfaces/dto/user.dto';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'kolbein-v3-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent {
  constructor(
    readonly usersService: UsersService,
    readonly route: ActivatedRoute
  ) {}
  section: Section = 'general';
  user$: Observable<PublicUser> = this.route.params.pipe(
    switchMap(({ userId }) => this.usersService.fetchUser(userId))
  );

  rankStr$: Observable<string> = this.user$.pipe(
    map((u) => {
      switch (u.rank) {
        case 'user':
          return 'Utilisateur';
        case 'mod':
          return 'Modérateur';
        case 'admin':
          return 'Administrateur';
        case 'dev':
          return 'Developpeur';
      }
    })
  );
  soundcloud$ = this.user$.pipe(map((u) => u.socials?.soundcloud));
  youtube$ = this.user$.pipe(map((u) => u.socials?.youtube));
  discord$ = this.user$.pipe(map((u) => u.socials?.discord));
  twitch$ = this.user$.pipe(map((u) => u.socials?.twitch));
}

type Section = 'general' | 'socials' | 'challenges' | 'actions';
