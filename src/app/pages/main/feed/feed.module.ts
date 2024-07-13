import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedPageRoutingModule } from './feed-routing.module';

import { FeedPage } from './feed.page';
import { FeedOccurrenceModule } from "../../../components/feed-occurrence/feed-occurrence.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedPageRoutingModule,
    FeedOccurrenceModule,
    ReactiveFormsModule,
  ],
  declarations: [FeedPage],
})
export class FeedPageModule {}
