import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UsersService } from './users.service';

@NgModule({
  declarations: [UserComponent],
  providers: [UsersService],
  imports: [CommonModule],
})
export class UsersModule {}
