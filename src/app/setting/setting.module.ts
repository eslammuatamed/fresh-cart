import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { EmailComponent } from './email/email.component';
import { CodeComponent } from './code/code.component';
import { ResetComponent } from './reset/reset.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EmailComponent, CodeComponent, ResetComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SettingModule {}
