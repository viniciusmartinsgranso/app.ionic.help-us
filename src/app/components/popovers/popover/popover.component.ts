import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  template: `
    <ion-content class="ion-padding">{{ content }}</ion-content>`,
})
export class PopoverComponent {

  @Input({ required: true })
  public content: string = '';
}
