import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { initializeApp } from './i18n-init';

// Factory function to create the TranslateHttpLoader
// This function is used to load translation files from the assets/i18n directory
export const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>
   new TranslateHttpLoader(http, 'assets/i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Provide the HttpClient for the TranslateHttpLoader
    provideHttpClient(),
    // Import the TranslateModule with the HttpLoaderFactory
    // importProvidersFrom is used to import the TranslateModule with the HttpLoaderFactory
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })),
    provideAppInitializer(() => initializeApp(inject(TranslateService))()),
  ],
};
