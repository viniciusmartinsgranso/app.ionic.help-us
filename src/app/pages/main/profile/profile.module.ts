import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ProfilePageRoutingModule } from "./profile-routing.module";
import { FeedOccurrenceModule } from "../../../components/feed-occurrence/feed-occurrence.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedOccurrenceModule,
    ProfilePageRoutingModule,
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
