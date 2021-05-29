import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [AuthComponent],
  providers: [AuthService],
  imports: [CommonModule, ClipboardModule],
})
export class AuthModule {}
