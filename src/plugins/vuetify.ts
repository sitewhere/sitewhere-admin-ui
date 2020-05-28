import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'

/** Define Vuetify configuration */
Vue.use(Vuetify);
const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.grey.darken2,
                secondary: colors.grey.darken3,
                accent: colors.grey.lighten2,
                error: colors.red.darken2
            },
        },
    }
});
export default vuetify;
