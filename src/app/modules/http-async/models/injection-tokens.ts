//#region Imports

import { InjectionToken } from '@angular/core';
import { HttpAsyncConfig } from './http-async.config';

//#endregion

/**
 * O `Injection Token` que pode ser usado para recuperar e sobrescrever as configurações desse módulo
 */
export const HTTP_ASYNC_CONFIG = new InjectionToken<HttpAsyncConfig>('HTTP_ASYNC_CONFIG');
