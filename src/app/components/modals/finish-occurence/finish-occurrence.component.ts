import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-finish-occurence',
  templateUrl: './finish-occurrence.component.html',
  styleUrls: ['./finish-occurrence.component.scss'],
})
export class FinishOccurrenceComponent  {

  constructor(
    private readonly modalController: ModalController,
    private readonly router: Router,
  ) { }

  public async onClickExit(): Promise<void> {
    await this.modalController.dismiss();
    await this.router.navigate(['/home']);
  }

}
