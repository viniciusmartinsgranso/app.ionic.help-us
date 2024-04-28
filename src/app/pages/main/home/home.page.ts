import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OccurrenceTypeEnum, occurrenceTypeTranslate } from '../../../models/enums/occurrence-type.enum';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { UserService } from "../../../services/user.service";
import { HelperService } from "../../../services/helper";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    this.getCurrentUser();
  }

  private readonly router: Router = inject(Router);

  private readonly userService: UserService = inject(UserService);

  private readonly helperService: HelperService = inject(HelperService);

  private destroyRef: DestroyRef = inject(DestroyRef);

  public occurrenceType: Record<OccurrenceTypeEnum, string> = occurrenceTypeTranslate;

  public user!: UserProxy;

  public async redirectToType(type: string): Promise<void> {
    await this.router.navigate(['new-feed-occurrence/', type]);
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

}
