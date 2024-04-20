import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FinishOccurrenceComponent } from '../../../components/modals/finish-occurence/finish-occurrence.component';
import { OccurrenceTypeEnum, occurrenceTypeTranslate } from '../../../models/enums/occurrence-type.enum';
import { OccurrenceProxy } from '../../../models/proxies/occurrence.proxy';
import { OccurrenceService } from '../../../services/occurrence.service';

@Component({
  selector: 'app-new-occurrence',
  templateUrl: './new-occurrence.page.html',
  styleUrls: ['./new-occurrence.page.scss'],
})
export class NewOccurrencePage {

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalController: ModalController,
    private readonly occurrenceService: OccurrenceService,
  ) {
    // const lastItem = JSON.parse(localStorage.getItem('occurrences'));
    // this.occurrence.id = lastItem[lastItem.length - 1].id + 1;
    //
    // this.occurrence.user = JSON.parse(localStorage.getItem('loggedUser'));
  }

  public type: OccurrenceTypeEnum = this.activatedRoute.snapshot.params['type'];

  public loggedUser: any;

  // public occurrence: OccurrenceProxy = {
  //   id: 4,
  //   title: '',
  //   description: '',
  //   location: '',
  //   photoUrl: '',
  //   type: this.type,
  // };

  public occurrence: OccurrenceProxy = {
    id: 0,
    title: '',
    location: '',
    description: '',
    type: this.type,
    user: undefined,
  };

  public typeTranslate: Record<OccurrenceTypeEnum, string> = occurrenceTypeTranslate;

  public occurrenceList: OccurrenceProxy[] = [];

  public getBase64(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        this.occurrence.photoUrl = reader.result.toString();
      }
    };
    reader.onerror = error => {
      console.log('Error: ', error);
    };
  }

  public async postNewOccurrence(): Promise<void> {
    console.log(this.occurrence);
    this.occurrenceService.create(this.occurrence);

    const modal = await this.modalController.create({
      mode: 'md',
      component: FinishOccurrenceComponent,
      cssClass: 'background-profile-modal',
    });

    await modal.present();
  }

  public canPost(): boolean {
    if (this.occurrence.title.length < 5)
      return false;

    if (this.occurrence.description.length < 5)
      return false;

    if (this.occurrence.location.length < 5)
      return false;

    return true;
  }

}
