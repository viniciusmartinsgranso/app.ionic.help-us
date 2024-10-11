import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from "./popover.component";
import { IonicModule } from "@ionic/angular";



@NgModule({
  declarations: [
    PopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PopoverComponent
  ]
})
export class PopoverModule { }
