import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { UserProxy } from "../../../models/proxies/user.proxy";
import { HelperService } from "../../../services/helper";
import { IonModal } from "@ionic/angular";
import * as L from "leaflet";
import { OccurrenceProxy } from "../../../models/proxies/occurrence.proxy";
import { LocationInterface } from "../../../models/interfaces/location.interface";
import { occurrenceTypeIconRecord } from "../../../models/enums/occurrence-type.enum";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  //#region View Child

  @ViewChild('infoModal') infoModal?: IonModal;

  //#endregion

  //#region Injectable Services

  private readonly userService: UserService = inject(UserService);

  private readonly helperService: HelperService = inject(HelperService);

  //#endregion

  //#reigon Public Properties

  public user!: UserProxy;

  public map!: L.Map;

  public currentIcon = L.icon({
    iconUrl: 'assets/images/current-location.png',
    iconSize: [38, 40],
    shadowSize: [50, 9],
    iconAnchor: [22, 39],
    shadowAnchor: [4, 7],
    popupAnchor: [-3, -131]
  });

  public occurrences: OccurrenceProxy[] = [];

  public isOpenInfoModal: boolean = false;

  public presentingElement: any;

  public currentLocation: LocationInterface = {
    latitude: 0,
    longitude: 0,
  };

  // public occurrence!: OccurrenceProxy;

  //#endregion

  //#region Life Cycle Methods

  constructor() {
    navigator.geolocation.getCurrentPosition((e) => this.setGeolocation(e.coords),
      async () => await this.helperService.showAlert('Atenção, você não aceitou a localização.', ['Ok']),
      { timeout: 40000 });
  }

  public async ngOnInit(): Promise<void> {
    this.presentingElement = document.querySelector('.page');
  }

  public async ionViewDidEnter(): Promise<void> {
    this.user = await this.userService.getMe(true);

    this.occurrences = this.user.occurrences;
    this.initMap();
  }

  public ionViewWillLeave(): void {
    this.map.remove();
  }

  //#endregion

  //#Region Private Methods

  private initMap(): void {
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('mapUser', {
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

  private setPropertiesToMap(): void {
    const marker = L.marker([this.currentLocation.latitude, this.currentLocation.longitude], { icon: this.currentIcon }).addTo(this.map);

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
      marker.addEventListener('click', async () => {
        // this.occurrence = occurrence;
        this.isOpenInfoModal = true;
      });
    })

    marker.addEventListener('click', e => console.log('Localização atual'))
  }

  private setGeolocation(geo: GeolocationCoordinates): void {
    this.currentLocation.longitude = geo.longitude;
    this.currentLocation.latitude = geo.latitude;
  }

  //#endregion

}
