import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GoogleOAuthCallbackPageRoutingModule } from './google-oauth-callback-routing.module';
import { GoogleOAuthCallbackPage } from './google-oauth-callback.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GoogleOAuthCallbackPageRoutingModule,
  ],
  declarations: [GoogleOAuthCallbackPage],
})
export class GoogleOAuthCallbackPageModule {}
