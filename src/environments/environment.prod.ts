import { apiRoutes } from "./apiRoutes";

export const environment = {
  production: true,
  api: {
    apiBaseUrl: 'https://api-nestjs-help-us.onrender.com',
    routes: apiRoutes
  },
  keys: {
    token: '@help-us/token',
    user: '@help-us/user',
  },
  config: {
    redirectToWhenAuthenticated: '/feed',
    redirectToWhenUnauthenticated: '/login',
  },
};
