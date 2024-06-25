/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue';
import KDMIcon from "./components/KDMIcon.vue";
import KDMImage from "./components/KDMImage.vue";
import Shield from "./components/Shield.vue";
import BoxInput from './components/BoxInput.vue';

// Composables
import { createApp } from 'vue'

import "./assets/cerceis.css";

const app = createApp(App)

registerPlugins(app)

app.component("KDMIcon", KDMIcon);
app.component("KDMImage", KDMImage);
app.component("Shield", Shield);
app.component("BoxInput", BoxInput);

app.mount('#app')
