import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage {

  private readonly router: Router = inject(Router);

  private readonly authService: AuthService = inject(AuthService);

  public async onLogout(): Promise<void> {
    await this.authService.logout();
  }

  public async redirectToFeed(): Promise<void> {
    await this.router.navigate(['/feed']);
  }

}
