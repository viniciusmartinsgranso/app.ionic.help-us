import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FinishOccurrenceComponent } from '../../../components/modals/finish-occurence/finish-occurrence.component';
import { OccurrenceTypeEnum, occurrenceTypeTranslate } from '../../../models/enums/occurrence-type.enum';
import { OccurrenceProxy } from '../../../models/proxies/occurrence.proxy';
import { OccurrenceService } from '../../../services/occurrence.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HelperService } from "../../../services/helper";

@Component({
  selector: 'app-new-occurrence',
  templateUrl: './new-occurrence.page.html',
  styleUrls: ['./new-occurrence.page.scss'],
})
export class NewOccurrencePage {

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.minLength(4)]],
      type: [],
      photoUrl: ['']
    });
  }

  private readonly occurrenceService: OccurrenceService = inject(OccurrenceService);

  private readonly modalController: ModalController = inject(ModalController);

  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private readonly helperService: HelperService = inject(HelperService);

  public type: OccurrenceTypeEnum = OccurrenceTypeEnum.COOP;

  public formGroup!: FormGroup;

  public typeTranslate: Record<OccurrenceTypeEnum, string> = occurrenceTypeTranslate;

  public getBase64(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        this.formGroup.controls['photoUrl'].setValue(reader.result.toString());
      }
    };
    reader.onerror = error => {
      console.log('Error: ', error);
    };
  }

  public async postNewOccurrence(): Promise<void> {
    const payload = this.formGroup.getRawValue();

    if (payload.photoUrl === '')
      delete payload.photoUrl;

    payload.type = +this.activatedRoute.snapshot.params['type'];
    const [ canCreate, message ] = await this.occurrenceService.create(payload);

    if (!canCreate) {
      return await this.helperService.showToast(message!);
    }

    const modal = await this.modalController.create({
      mode: 'md',
      component: FinishOccurrenceComponent,
      cssClass: 'background-profile-modal',
    });

    await modal.present();
  }

}
