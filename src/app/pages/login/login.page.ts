import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from "../../services/helper";
import { AuthService } from "../../services/auth.service";
import { LoginPayload } from "../../models/payloads/login.payload";
import { CustomValidators } from "../../utils/validators";
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;
import { GoogleAuthorizationUrl, GoogleOAuthWindowMessage } from "../../models/proxies/google.proxy";
import { googleOauthResult } from "../../constants/google-oauth.constants";
import { environment } from "../../../environments/environment";
import { getCrudErrors } from "../../utils/functions";

/**
 * Login Google em popup: GOOGLE_REDIRECT_URI na API deve ser a URL deste app,
 * ex.: http://localhost:4200/oauth-google-callback — mesma origem desta página.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnDestroy {

  constructor(
  ) { }

  public readonly router: Router = inject(Router);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly authService: AuthService = inject(AuthService);

  private googleOAuthListener?: (event: MessageEvent) => void;

  public loginPayload: LoginPayload = {
    id: 0,
    email: '',
    password: '',
    city: '',
    name: '',
  };

  public isLoading = false;

  public showPasswordLogin: boolean = false;

  public ngOnDestroy(): void {
    this.detachGoogleOAuthListener();
  }

  public async login(): Promise<void> {
    if (!this.canLogin()) return;

    this.isLoading = true;

    const [ canLogin, message ] = await this.authService.login(this.loginPayload.email, this.loginPayload.password);

    this.isLoading = false;

    if (!canLogin)
      return void this.helperService.showToast(message);

    await this.helperService.showToast('Sucesso!', );
    await this.router.navigateByUrl('/feed');
  }

  public canLogin(): boolean {
    return isValidEmail(this.loginPayload.email) && isValidPassword(this.loginPayload.password);
  }

  public async invitedLogin(): Promise<void> {
    this.isLoading = true;

    const [canLogin, message] = await this.authService.invited();

    this.isLoading = false;

    if (!canLogin)
      return void this.helperService.showToast(message);

    await this.helperService.showToast(message);
    await this.router.navigateByUrl('/feed');
  }

  public async googleLogin(): Promise<void> {
    this.isLoading = true;
    const { success: googleUrl, error } = await this.authService.googleLogin();
    this.isLoading = false;

    if (error) {
      await this.helperService.showToast(
        getCrudErrors(error)[0] ?? error.message ?? 'Erro ao iniciar login com Google.',
      );
    }

    if (!googleUrl) {
      return;
    }

    this.openGooglePopup(googleUrl);
  }

  /**
   * Registra window.addEventListener('message', …) — não é detecção de "guia fechada".
   */
  private attachGoogleOAuthListener(): void {
    this.detachGoogleOAuthListener();

    this.googleOAuthListener = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        await this.helperService.showToast(
          'Não foi possível entrar com Google.',
        );
        return;
      }

      const data = event.data as GoogleOAuthWindowMessage;
      if (!data || data.type !== googleOauthResult) {
        await this.helperService.showToast(
          'Não foi possível entrar com Google.',
        );
        return;
      }

      this.detachGoogleOAuthListener();
      void this.handleGoogleOAuthResult(data);
    };
    window.addEventListener('message', this.googleOAuthListener);
  }

  private detachGoogleOAuthListener(): void {
    if (!this.googleOAuthListener)
      return;

    window.removeEventListener('message', this.googleOAuthListener);
    this.googleOAuthListener = undefined;
  }

  private async handleGoogleOAuthResult(
    data: GoogleOAuthWindowMessage,
  ): Promise<void> {
    if (!data.ok || !data.token) {
      await this.helperService.showToast(
        data.message ?? 'Não foi possível entrar com Google.',
      );
      return;
    }

    const [ok, message] = await this.authService.completeGoogleSession(data.token);

    if (!ok) {
      await this.helperService.showToast(message);
      return;
    }

    await this.helperService.showToast(message);
    await this.router.navigateByUrl(
      environment.config.redirectToWhenAuthenticated,
    );
  }

  private openGooglePopup(success: GoogleAuthorizationUrl): void {
    this.attachGoogleOAuthListener();

    const width = 480;
    const height = 640;
    const left =
      window.screenX + (window.outerWidth - width) / 2;
    const top =
      window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      success.authorizationUrl,
      'googleOAuth',
      `popup=yes,width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
    );

    if (!popup) {
      this.detachGoogleOAuthListener();
      void this.helperService.showToast(
        'Não foi possível abrir a janela. Permita pop-ups para este site.',
      );
      return;
    }
  }

}
