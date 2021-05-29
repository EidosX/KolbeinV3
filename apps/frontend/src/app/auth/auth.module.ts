import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CodeComponent } from './code/code.component';

@NgModule({
  declarations: [AuthComponent, CodeComponent],
  providers: [AuthService],
  imports: [CommonModule, ClipboardModule],
})
export class AuthModule {}
