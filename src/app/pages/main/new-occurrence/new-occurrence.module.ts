import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOccurrencePageRoutingModule } from './new-occurrence-routing.module';

import { NewOccurrencePage } from './new-occurrence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewOccurrencePageRoutingModule,
  ],
  declarations: [NewOccurrencePage]
})
export class NewOccurrencePageModule {}
