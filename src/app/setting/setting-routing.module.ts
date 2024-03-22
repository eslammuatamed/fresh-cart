import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { CodeComponent } from './code/code.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  { path: '', redirectTo: 'email', pathMatch: 'full' },
  { path: 'email', component: EmailComponent },
  { path: 'code', component: CodeComponent },
  { path: 'reset', component: ResetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
