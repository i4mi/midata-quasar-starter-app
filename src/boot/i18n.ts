import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

// Import messages
import messages from 'src/i18n';

export default boot(({ app }) => {
  // Create i18n instance with options
  const i18n = createI18n({
    locale: 'de-ch',
    legacy: false,
    messages,
  });
  // Set i18n instance on app
  app.use(i18n);
});
