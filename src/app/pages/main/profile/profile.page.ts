import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OccurrenceProxy } from '../../../models/proxies/occurrence.proxy';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { UserService } from "../../../services/user.service";
import { HelperService } from "../../../services/helper";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private readonly router: Router = inject(Router);

  private readonly userService: UserService = inject(UserService);

  private readonly helperService: HelperService = inject(HelperService);

  public user!: UserProxy;

  public isLoading: boolean = false;

  public occurrences: OccurrenceProxy[] = [];

  public async ngOnInit(): Promise<void> {
    await this.getCurrentUser();
  }

  public async getCurrentUser(): Promise<void> {
    const token = await this.userService.getUserToken();
    const user = await this.userService.getCurrentUserFromStorage();

    if (!token || !user) {
      return await this.onUserError();
    }

    this.user = user;
  }

  private async onUserError(): Promise<void> {
    await this.helperService.showToast('Atenção, você não pode acessar essa página.')
    return void this.router.navigateByUrl('/login');
  }

  public async logoutPage(page: string): Promise<void> {
    await this.router.navigateByUrl(page);
  }
  public getUserOccurrences(): void {
    // this.occurrences = [];
    // const occurrences = localStorage.getItem('occurrences') ? JSON.parse(localStorage.getItem('occurrences')) : [];
    //
    // const logs = occurrences.filter(oc => oc.user.id === this.user.id);
    // this.occurrences.push(...logs);
    // console.log(this.occurrences[0]);
  }
}
