import { boot } from 'quasar/wrappers';

// Import Storage, MidataService and moment
import Storage from 'src/plugins/storage';
import MidataService from 'src/plugins/midataService';
import moment from 'moment';

// Create MidataService and Storage
const midata = new MidataService();
const storage = new Storage(midata);

// Type declaration
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $midata: typeof midata;
    $storage: typeof storage;
    $moment: typeof moment;
  }
}

export default boot(({ app }) => {
  // Set global variables
  app.config.globalProperties.$midata = midata;
  app.config.globalProperties.$storage = storage;
  app.config.globalProperties.$moment = moment;
});

export { midata, storage, moment };
