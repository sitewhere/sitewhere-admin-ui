import "./class-component-hooks";

import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import SiteWhere from "sitewhere-ide-components";
import Vuetify from "vuetify";
import Vuelidate from "vuelidate";
import Vue2Leaflet from "vue2-leaflet";
import VueMoment from "vue-moment";
import VueClipboards from "vue-clipboards";
import VueHighlightJS from "vue-highlightjs";
import VueFlatPickr from "vue-flatpickr-component";

Vue.use(Vuetify, {
  theme: {
    primary: "#616161",
    secondary: "#333333",
    accent: "#8c9eff",
    error: "#b71c1c"
  }
});

Vue.use(SiteWhere);
Vue.use(Vuelidate);
Vue.use(VueMoment);
Vue.use(VueClipboards);
Vue.use(VueHighlightJS);
Vue.use(VueFlatPickr);

// Fontawesome.
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.component("v-map", Vue2Leaflet.Map);
Vue.component("v-tilelayer", Vue2Leaflet.TileLayer);
Vue.component("v-marker", Vue2Leaflet.Marker);

// BEGIN HACK to get around problems with Leaflet issues.
import L from "leaflet";
import D from "leaflet-draw";

console.log(D);

//delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

customize(L.Draw.Polyline.prototype);
customize(L.Edit.PolyVerticesEdit.prototype);

function customize(prototype: any) {
  var options = prototype.options;
  options.icon.options.iconSize = new L.Point(10, 10);
  options.touchIcon = options.icon;
}
// END HACK.

require("./assets/sitewhere.css");

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router: router,
  store: store,
  template: "<App/>",
  components: {
    App
  }
});
