import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App);
app.use(router);
app.use(Toast);
app.use(VueGoogleMaps, {
    load: {
      key: 'chave_de_acesso_da_API', // Substitua pela sua chave do Google Maps
    },
  })
app.mount('#app');