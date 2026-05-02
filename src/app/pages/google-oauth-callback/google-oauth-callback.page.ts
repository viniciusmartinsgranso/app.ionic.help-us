import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtTokenProxy } from '../../models/proxies/jwt-token.proxy';
import { environment } from '../../../environments/environment';
import { HttpAsyncService } from '../../modules/http-async/services/http-async.service';
import { googleOauthResult } from '../../constants/google-oauth.constants';
import { GoogleOAuthCallbackMessage } from "../../models/proxies/google.proxy";

@Component({
  selector: 'app-google-oauth-callback',
  templateUrl: './google-oauth-callback.page.html',
  styleUrls: ['./google-oauth-callback.page.scss'],
})
export class GoogleOAuthCallbackPage implements OnInit {
  private readonly route = inject(ActivatedRoute);

  private readonly http = inject(HttpAsyncService);

  private origin = window.location.origin;

  public ngOnInit(): void {
    void this.run();
  }

  private async run(): Promise<void> {
    const code = this.route.snapshot.queryParamMap.get('code');
    const oauthError = this.route.snapshot.queryParamMap.get('error');

    if (oauthError) {
      this.notifyOpener({ ok: false, message: oauthError });
      return;
    }

    if (!code) {
      this.notifyOpener({
        ok: false,
        message: 'Código de autorização ausente.',
      });
      return;
    }

    const { error, success } = await this.http.post<JwtTokenProxy>(
      environment.api.routes.auth.googleCallback,
      { code },
    );

    if (error || !success?.token) {
      this.notifyOpener({
        ok: false,
        message: error?.message ?? 'Falha ao concluir login com Google.',
      });
      return;
    }

    this.notifyOpener({ ok: true, token: success.token, code });
  }

  private notifyOpener(payload: GoogleOAuthCallbackMessage): void {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage(
        { type: googleOauthResult, ...payload },
        this.origin,
      );
    }
    window.close();
  };
}
