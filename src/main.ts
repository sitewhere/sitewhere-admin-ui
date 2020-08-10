import Vue from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";

import Vuelidate from "vuelidate";
import Vue2Leaflet from "vue2-leaflet";
import VueMoment from "vue-moment";
import VueClipboards from "vue-clipboards";
import VueHighlightJS from "vue-highlightjs";
import VueFlatPickr from "vue-flatpickr-component";

Vue.use(Vuelidate);
Vue.use(VueMoment);
Vue.use(VueClipboards);
Vue.use(VueHighlightJS);
Vue.use(VueFlatPickr);

Vue.component("v-map", Vue2Leaflet.Map);
Vue.component("v-tilelayer", Vue2Leaflet.TileLayer);
Vue.component("v-marker", Vue2Leaflet.Marker);

// BEGIN HACK to get around problems with Leaflet issues.
import L from "leaflet";
import D from "leaflet-draw";

console.log(D);

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

function customize(prototype: any) {
  const options = prototype.options;
  options.icon.options.iconSize = new L.Point(10, 10);
  options.touchIcon = options.icon;
}

customize(L.Draw.Polyline.prototype);
customize(L.Edit.PolyVerticesEdit.prototype);

// END HACK.

require("./assets/sitewhere.css");

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
