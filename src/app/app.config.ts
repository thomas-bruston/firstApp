import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular 21 — pas de Zone.js, changements détectés via Signals
    provideZonelessChangeDetection(),

    // Active le router + lecture des params :id via @Input()
    provideRouter(routes, withComponentInputBinding()),

    // Active HttpClient avec l'API fetch native du navigateur
    provideHttpClient(withFetch()),
  ]
};
