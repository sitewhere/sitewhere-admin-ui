import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  ISiteWhereUIState
} from "sitewhere-ide-common";

Vue.use(Vuex);

const store: StoreOptions<ISiteWhereUIState> = {
  plugins: [createPersistedState()],
  state: {
    remoteInstances: {
      default: "local",
      instances: [
        {
          id: "local",
          name: "Local Instance",
          baseUrl: "http://localhost/sitewhere",
        }
      ]
    },
    instanceUrl: undefined,
    jwt: undefined,
    user: undefined,
    authToken: undefined,
    authTenants: null,
    settings: null,
    selectedTenant: undefined,
    currentSection: undefined,
    loading: false,
    error: undefined,
    message: undefined
  },
  mutations: {
    // Set list of remote connections.
    remoteInstances(state, remoteInstances) {
      state.remoteInstances = remoteInstances;
    },

    // Set instance url.
    instanceUrl(state, instanceUrl) {
      state.instanceUrl = instanceUrl;
    },

    // Set current JWT.
    jwt(state, jwt) {
      state.jwt = jwt;
    },

    // Set currently logged in user.
    user(state, user) {
      state.user = user;
    },

    // Set authentication token for logged in user.
    authToken(state, token) {
      state.authToken = token;
    },

    // Set list of authorized tenants.
    authTenants(state, tenants) {
      state.authTenants = tenants;
    },

    // Store persistent user settings.
    settings(state, settings) {
      state.settings = settings;
    },

    // Set selected tenant.
    selectedTenant(state, selectedTenant) {
      state.selectedTenant = selectedTenant;
    },

    // Set current app section.
    currentSection(state, section) {
      state.currentSection = section;
    },

    // Start loading indicator.
    startLoading(state) {
      state.loading = true;
    },

    // Stop loading indicator.
    stopLoading(state) {
      state.loading = false;
    },

    // Set error indicator.
    error(state, error) {
      state.error = error;
    },

    // Set alert message.
    message(state, message) {
      state.message = message;
    },

    // Log out of the application.
    logOut(state) {
      state.user = undefined;
      state.authToken = undefined;
      state.authTenants = undefined;
      state.selectedTenant = undefined;
      state.currentSection = undefined;
      state.error = undefined;
      state.message = undefined;
    }
  },

  getters: {
    remoteInstances: state => {
      return state.remoteInstances;
    },

    instanceUrl: state => {
      return state.instanceUrl;
    },

    jwt: state => {
      return state.jwt;
    },

    user: state => {
      return state.user;
    },

    authToken: state => {
      return state.authToken;
    },

    authTenants: state => {
      return state.authTenants;
    },

    selectedTenant: state => {
      return state.selectedTenant;
    },

    currentSection: state => {
      return state.currentSection;
    },

    loading: state => {
      return state.loading;
    },

    error: state => {
      return state.error;
    },

    message: state => {
      return state.message;
    }
  }
};

export default new Vuex.Store<ISiteWhereUIState>(store);
