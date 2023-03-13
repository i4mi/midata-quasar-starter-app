import { boot } from 'quasar/wrappers';

// Import MidataService
import MidataService from 'src/plugins/midataService';

// Create MidataService
const midata = new MidataService();

// Type declaration
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $midata: typeof midata;
  }
}

export default boot(({ app }) => {
  // Set global variables
  app.config.globalProperties.$midata = midata;
});

export { midata };
