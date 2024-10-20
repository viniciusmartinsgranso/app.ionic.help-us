import { Component, inject, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { OccurrenceService } from "../../../services/occurrence.service";
import { HelperService } from "../../../services/helper";
import { LocationInterface } from "../../../models/interfaces/location.interface";
import { OccurrenceProxy } from "../../../models/proxies/occurrence.proxy";
import { ActionSheetController, IonModal, PopoverController } from "@ionic/angular";
import {
  OccurrenceTypeEnum,
  occurrenceTypeIconRecord,
  occurrenceTypeTranslate,
  occurrenceTypeWhiteImage
} from "../../../models/enums/occurrence-type.enum";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MediaService } from "../../../services/media.service";
import { UserService } from "../../../services/user.service";
import { UserProxy } from "../../../models/proxies/user.proxy";
import { Router } from "@angular/router";
import { PopoverComponent } from "../../../components/popovers/popover/popover.component";
import { RolesEnum } from "../../../models/enums/roles.enum";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  constructor() {
    navigator.geolocation.watchPosition((e) => this.setGeolocation(e.coords),
      async () => await this.helperService.showAlert('Atenção, você não aceitou a localização.', ['Ok']),
      { timeout: 10000 });

    this.formGroup = this.formBuilder.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.minLength(4)]],
      latitude: [0],
      longitude: [0],
      type: [null, Validators.required],
      photoUrl: [null]
    });

    this.userFormGroup = this.formBuilder.group({
      name: [''],
      email: [''],
      city: [''],
      photoUrl: ['']
    });
  }

  //#region Injection Services

  private readonly occurrenceService: OccurrenceService = inject(OccurrenceService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly mediaService: MediaService = inject(MediaService);

  private readonly userService: UserService = inject(UserService);

  private readonly router: Router = inject(Router)

  private readonly popoverController: PopoverController = inject(PopoverController);

  //#endregion

  //#region Map Properties

  public map!: L.Map;

  public mapMarkers: L.Marker[] = [];

  public currentLocation: LocationInterface = {
    latitude: 0,
    longitude: 0,
  };

  public currentIcon = L.icon({
    iconUrl: 'assets/images/current-location.png',
    iconSize: [38, 40],
    shadowSize: [50, 9],
    iconAnchor: [22, 39],
    shadowAnchor: [4, 7],
    popupAnchor: [-3, -131]
  });

  public currentMarker!: L.Marker;

  //#endregion

  //#region Public Properties

  @ViewChild('createModal') createModal?: IonModal;

  @ViewChild('infoModal') infoModal?: IonModal;

  @ViewChild('editUserModal') editUserModal?: IonModal;

  public occurrences: OccurrenceProxy[] = [];

  public isOpenCreateAndEditModal: boolean = false;

  public isOpenInfoModal: boolean = false;

  public presentingElement: any;

  public formGroup: FormGroup;

  public userFormGroup: FormGroup;

  public occurrenceType: typeof OccurrenceTypeEnum = OccurrenceTypeEnum;

  public translatedOccurrenceType: Record<OccurrenceTypeEnum, string> = occurrenceTypeTranslate;

  public occurrenceWhiteIcon: Record<OccurrenceTypeEnum, string> = occurrenceTypeWhiteImage;

  public occurrence!: OccurrenceProxy;

  public currentUser!: UserProxy;

  public canEdit: boolean = false;

  public isEdit: boolean = false;

  public showPopover: boolean = false;

  public isInvited: boolean = false;

  public isOpenUserModal: boolean = false;

  public isLoading: boolean = false;

  //#endregion

  //#Region Public Methods

  public async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.presentingElement = document.querySelector('.feed');
    this.currentUser = await this.userService.getMe(true);

    this.isInvited = this.currentUser.roles.includes(RolesEnum.NONE);
  }

  public async ionViewDidEnter(): Promise<void> {
    await this.getOccurrences();
    this.initMap();

    this.isLoading = false;
  }

  public ionViewDidLeave(): void {
    this.map.eachLayer(e => e.removeFrom(this.map))
    this.map.remove();
    this.map.off()
    this.map.eachLayer(e => console.log(e))
  }

  public async closeInfoModal(): Promise<void> {
    this.isOpenInfoModal = false;
  }

  public async closeCreateModal(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Sim',
          role: 'confirm',
        },
        {
          text: 'Não',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    this.isOpenCreateAndEditModal = role !== 'confirm';

    if (!this.isOpenCreateAndEditModal)
      this.formGroup.reset();
  }

  public async closeUserModal(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Deseja mesmo sair?',
      buttons: [
        {
          text: 'Sim',
          role: 'confirm',
        },
        {
          text: 'Não',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    this.isOpenUserModal = role !== 'confirm';

    if (!this.isOpenUserModal)
      this.userFormGroup.reset();
  }

  public getCurrentIconType(): string {
    return this.occurrenceWhiteIcon[this.formGroup.controls['type'].value as OccurrenceTypeEnum];
  }

  public async postOccurrence(): Promise<void> {
    const payload = this.formGroup.getRawValue();
    this.isLoading = true;

    const [canCreate, message] = await this.occurrenceService.create(payload);

    if (!canCreate && message) {
      this.isLoading = false;
      return void await this.helperService.showToast(message);
    }

    await this.helperService.showToast('Ocorrência criada com sucesso!');
    this.isOpenCreateAndEditModal = false;

    await this.getOccurrences();
    this.setPropertiesToMap();

    this.isLoading = false;
  }

  public async uploadImage(event: Event): Promise<void> {
    if (!event.target) return;

    const fileList = (event.target as HTMLInputElement).files;
    if (!fileList || fileList.length === 0) return;

    const file = fileList[0] as File;
    if (!file) return;

    const [success, media] = await this.mediaService.uploadImage(file);
    if (!success)
      return await this.helperService.showToast(media);

     this.isOpenUserModal ? this.userFormGroup.controls['photoUrl'].setValue(media) : this.formGroup.controls['photoUrl'].setValue(media);
  }

  public editOccurrence(): void {
    if (!this.canEdit || !this.isEdit)
      return;

    this.formGroup.reset();
    this.isEdit = true;

    this.formGroup.patchValue({
      title: this.occurrence.title,
      description: this.occurrence.description,
      location: this.occurrence.location,
      type: this.occurrence.type,
      photoUrl: this.occurrence.photoUrl
    });

    this.isOpenInfoModal = false;
    this.isOpenCreateAndEditModal = true;
  }

  public updateOccurrence(): void {
    console.log(this.formGroup.getRawValue())
  }

  public async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  public async filterByUser(): Promise<void> {
    this.currentUser = await this.userService.getMe(true);
    this.occurrences = this.currentUser.occurrences;
    this.map.setView([this.currentLocation.latitude, this.currentLocation.longitude]);

    this.setPropertiesToMap();
  }

  public async getAllOccurrences(): Promise<void> {
    await this.getOccurrences();
    this.map.setView([this.currentLocation.latitude, this.currentLocation.longitude]);

    this.setPropertiesToMap();
  }

  public async redirectToLogout(): Promise<void> {
    return void await this.router.navigateByUrl('logout');
  }

  public async openPopovers(e: Event): Promise<void> {
    this.showPopover = !this.showPopover;

    if (!this.showPopover) {
      return;
    }

    const userPop: Event = {
      ...e,
      target: document.getElementById('user-trigger'),
    };

    const globalPop: Event = {
      ...e,
      target: document.getElementById('globe-trigger'),
    };

    const logoutPop: Event = {
      ...e,
      target: document.getElementById('logout-trigger'),
    };

    const personPop: Event = {
      ...e,
      target: document.getElementById('person-trigger'),
    };

    if (this.isInvited) {
      const log = await this.createPopover(logoutPop, 'Sair da conta');
      return void await log.present();
    }

    const popovers = await Promise.all([
      this.createPopover(userPop, 'Filtro por usuário'),
      this.createPopover(globalPop, 'Todas as ocorrências'),
      this.createPopover(logoutPop, 'Sair da conta'),
      this.createPopover(personPop, 'Editar perfil')
    ]);

    for (const popover of popovers) {
      await popover.present();
    }
  }

  public reloadPage(): void {
    window.location.reload();
  }

  public personEdit(): void {
    this.userFormGroup.patchValue({
      name: this.currentUser.name,
      email: this.currentUser.email,
      city: this.currentUser.city,
      photoUrl: this.currentUser.photoUrl,
    });

    this.isOpenUserModal = true;
  }

  public async updateUser(): Promise<void> {
    const payload = this.userFormGroup.getRawValue();

    this.isLoading = true;

    const [success, message] = await this.userService.update(this.currentUser.id, payload);

    this.isLoading = false;

    if (!success && message) {
      return void await this.helperService.showToast(message);
    }

    return void this.helperService.showToast('Usuário atualizado com sucesso!');
  }

  //#endregion

  //#Region Private Methods

  private async getOccurrences(): Promise<void> {
    this.occurrences = [];
    const occurrences = await this.occurrenceService.get(this.currentLocation);

    if (typeof occurrences === "string")
      return void this.helperService.showToast(occurrences)

    this.occurrences = occurrences;
  }

  private initMap(): void {
    if (this.map)
      this.map.remove();

    this.map = L.map('mapHome', {
      zoom: 3,
      tap: true,
    }).setView([this.currentLocation.latitude, this.currentLocation.longitude], 15);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
      },
    );
    tiles.addTo(this.map);

    this.setPropertiesToMap();
  }

  private setGeolocation(geo: GeolocationCoordinates): void {
    if (this.currentMarker)
      this.map.removeLayer(this.currentMarker);

    this.currentLocation.longitude = geo.longitude;
    this.currentLocation.latitude = geo.latitude;

    const marker = L.marker([this.currentLocation.latitude, this.currentLocation.longitude], { icon: this.currentIcon }).addTo(this.map);
    this.currentMarker = marker;

    marker.addEventListener('click', e => this.helperService.showToast('Sua localização.'))
  }

  private setPropertiesToMap(): void {
    for (const marker of this.mapMarkers) {
      this.map.removeLayer(marker);
    }

    this.occurrences.forEach((occurrence) => {
      const icon = L.icon({
        iconUrl: occurrenceTypeIconRecord[occurrence.type],
        iconSize: [38, 40],
        shadowSize: [50, 9],
        iconAnchor: [22, 39],
        shadowAnchor: [4, 7],
        popupAnchor: [-3, -131],
        className: 'leaftlet-occurrence-icon',
      });

      const marker = L.marker([occurrence.latitude, occurrence.longitude], { icon }).addTo(this.map);

      this.mapMarkers.push(marker);

      marker.addEventListener('click', async () => {
        const [response, message] = await this.userService.getOne(occurrence.userId);

        if (occurrence.userId === this.currentUser.id)
          this.canEdit = true;

        if (typeof response === "boolean" && message)
          return void await this.helperService.showToast('O usuário não existe ou foi desativado.');

        occurrence.user = response as UserProxy;

        this.occurrence = occurrence;
        this.isOpenInfoModal = true;
      });
    });

    this.map.addEventListener('click', (e) => {
      this.isOpenCreateAndEditModal = true;
      this.formGroup.controls['latitude'].setValue(e.latlng.lat);
      this.formGroup.controls['longitude'].setValue(e.latlng.lng);
    });
  }

  private createPopover(event: Event, content: string): Promise<HTMLIonPopoverElement> {
    return this.popoverController.create({
      component: PopoverComponent,
      componentProps: {
        content
      },
      event,
      side: 'left',
    });
  }

  //#endregion

}
