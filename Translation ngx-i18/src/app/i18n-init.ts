import { TranslateService } from '@ngx-translate/core';

export const SUPPORTED_LANGS = ['en', 'es', 'fr'];

export function translationInitializerFactory(translate: TranslateService) {
  return () => {
    const browserLang: string = translate.getBrowserLang() || '';
    const lang = SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';

    return new Promise((resolve) => {
      translate.use(lang).subscribe({
        next: () => resolve(true),
        error: () => resolve(true),
      });
    });
  };
}
