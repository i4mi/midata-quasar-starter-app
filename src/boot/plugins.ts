import { boot } from 'quasar/wrappers';

// Import Storage, MidataService and moment
import Storage from 'src/plugins/storage';
import MidataService from 'src/plugins/midataService';
import EpdService from 'src/plugins/epdService';
import moment from 'moment';

// Create MidataService and Storage
const midata = new MidataService();
const epd = new EpdService();
const storage = new Storage(midata);


// Type declaration
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $midata: typeof midata;
    $epd: typeof epd;
    $storage: typeof storage;
    $moment: typeof moment;
  }
}

export default boot(({ app }) => {
  // Set global variables
  app.config.globalProperties.$midata = midata;
  app.config.globalProperties.$epd = epd;
  app.config.globalProperties.$storage = storage;
  app.config.globalProperties.$moment = moment;
});

export { midata, epd, storage, moment };
