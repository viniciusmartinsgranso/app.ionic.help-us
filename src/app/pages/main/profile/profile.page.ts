import { Component, inject, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { UserProxy } from "../../../models/proxies/user.proxy";
import { HelperService } from "../../../services/helper";
import { OccurrenceService } from "../../../services/occurrence.service";
import { MediaService } from "../../../services/media.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private readonly userService: UserService = inject(UserService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly occurrenceService: OccurrenceService = inject(OccurrenceService);

  public user!: UserProxy;

  public async ngOnInit(): Promise<void> {
    this.user = await this.userService.getMe()
  }

}
