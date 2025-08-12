import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
  APP_INITIALIZER,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { translationInitializerFactory } from './i18n-init';

// Factory function to create the TranslateHttpLoader
// This function is used to load translation files from the assets/i18n directory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Provide the HttpClient for the TranslateHttpLoader
    provideHttpClient(),
    // Import the TranslateModule with the HttpLoaderFactory
    // importProvidersFrom is used to import the TranslateModule with the HttpLoaderFactory
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: translationInitializerFactory,
      deps: [TranslateService],
    },
  ],
};
