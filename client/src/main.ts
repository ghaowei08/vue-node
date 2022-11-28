import { createApp } from 'vue'
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import session from './i18n/session.json';

import './style.css'
import App from './App.vue'

const locales = {
  en: { ...session.en },
  ch: { ...session.ch },
};

i18next.init({
  lng: 'en',
  resources: {
    en: { translation: locales.en },
    ch: { translation: locales.ch },
  },
});


const myApp = createApp(App)
myApp.use(I18NextVue, {
  i18next: i18next,
  rerenderOn: ['initialized', 'languageChanged', 'loaded'],
});
myApp.mount('#app')
