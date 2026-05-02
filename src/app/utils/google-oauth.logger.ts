/**
 * Logs do fluxo Google OAuth no DevTools (F12 → Console).
 * Prefixo fixo para filtrar: HelpUs GoogleOAuth
 */
const PREFIX = '[HelpUs][GoogleOAuth]';

export function logGoogleOAuth(step: string, detail?: unknown): void {
  if (detail !== undefined) {
    console.log(PREFIX, step, detail);
  } else {
    console.log(PREFIX, step);
  }
}
