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
  googleApiKey: 'AIzaSyAMHKh4Wrw5K4PDo7-HT89UIB1_0sOZ5PI',
};
