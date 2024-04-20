import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-finish-occurence',
  templateUrl: './finish-occurrence.component.html',
  styleUrls: ['./finish-occurrence.component.scss'],
})
export class FinishOccurrenceComponent implements OnInit {

  constructor(
    private readonly modalController: ModalController,
    private readonly router: Router,
  ) { }

  ngOnInit() {}

  public async onClickExit(): Promise<void> {
    await this.modalController.dismiss();
    await this.router.navigate(['/home']);
  }

}
