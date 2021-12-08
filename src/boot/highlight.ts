import { boot } from 'quasar/wrappers';
import 'highlight.js/styles/stackoverflow-light.css';
import hljs from 'highlight.js/lib/core';
import hljsVuePlugin from '@highlightjs/vue-plugin';

// Import languages to use with highlight.js
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';

export default boot(({ app }) => {
  // Register languages to hljs
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('json', json);

  // Set hljsVuePlugin instance on app
  app.use(hljsVuePlugin);
});
