import { TranslateService } from '@ngx-translate/core';

export const SUPPORTED_LANGS = ['en', 'es', 'fr'];

export function initializeApp(translate: TranslateService) {
  return () => {
    const browserLang: string = translate.getBrowserLang() || '';
    const lang = SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';

    // translate.setDefaultLang('en');
    translate.use(lang);
  };
}
