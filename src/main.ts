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
import Shield from "./components/Shield.vue";

// Composables
import { createApp } from 'vue'

import "./assets/cerceis.css";

const app = createApp(App)

registerPlugins(app)

app.component("KDMIcon", KDMIcon);
app.component("Shield", Shield);
app.mount('#app')
