import { browser } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
   // return element(by.css('app-root main h1')).getText();
    return 'Pharos';
  }
}
