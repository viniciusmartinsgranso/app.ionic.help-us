export interface GoogleAuthorizationUrl {
  authorizationUrl: string;
}

export interface GoogleOAuthWindowMessage extends GoogleOAuthCallbackMessage {
  type: string;
}

export interface GoogleOAuthCallbackMessage {
  ok: boolean;
  token?: string;
  message?: string;
  code?: string;
}
