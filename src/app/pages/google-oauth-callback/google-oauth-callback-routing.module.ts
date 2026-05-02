import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleOAuthCallbackPage } from './google-oauth-callback.page';

const routes: Routes = [
  {
    path: '',
    component: GoogleOAuthCallbackPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoogleOAuthCallbackPageRoutingModule {}
