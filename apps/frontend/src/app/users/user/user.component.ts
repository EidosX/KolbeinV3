import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicUser } from '@interfaces/dto/user.dto';
import { UsersService } from '../users.service';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Rank } from '@interfaces/rank';

@Component({
  selector: 'kolbein-v3-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(
    readonly usersService: UsersService,
    readonly route: ActivatedRoute
  ) {}
  section: Section = 'general';
  user: PublicUser | undefined;
  userSubscribtion: Subscription | undefined;
  rankStrings: Record<Rank, string> = {
    user: 'Utilisateur',
    mod: 'Modérateur',
    admin: 'Administrateur',
    dev: 'Developpeur',
  };

  ngOnInit(): void {
    this.userSubscribtion = this.route.params
      .pipe(switchMap((p) => this.usersService.fetchUser(p.userId)))
      .subscribe((user) => (this.user = user));
  }
  ngOnDestroy(): void {
    this.userSubscribtion?.unsubscribe();
  }
}

type Section = 'general' | 'socials' | 'challenges' | 'actions';
