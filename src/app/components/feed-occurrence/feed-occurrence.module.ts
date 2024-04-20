import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FeedOccurrenceComponent } from './feed-occurrence.component';



@NgModule({
  declarations: [
    FeedOccurrenceComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    FeedOccurrenceComponent,
  ]
})
export class FeedOccurrenceModule { }
