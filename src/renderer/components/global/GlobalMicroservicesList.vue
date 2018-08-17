<template>
  <navigation-page icon="fa-globe" title="Global Microservices"
    loadingMessage="Loading global microservices list ..." :loaded="loaded">
    <div slot="content">
      <microservice-list v-if="topology" :topology="topology"
        @microserviceClicked="onMicroserviceClicked">
      </microservice-list>
    </div>
  </navigation-page>
</template>

<script>
import NavigationPage from '../common/NavigationPage'
import MicroserviceList from '../microservice/MicroserviceList'
import {
  _getGlobalTopology
} from '../../http/sitewhere-api-wrapper'

export default {

  data: () => ({
    topology: null,
    loaded: false
  }),

  components: {
    NavigationPage,
    MicroserviceList
  },

  created: function () {
    this.refresh()
  },

  methods: {
    // Called if a microservice is clicked.
    onMicroserviceClicked: function (microservice) {
      this.$router.push('/system/microservices/' + microservice.identifier)
    },

    // Called to refresh data.
    refresh: function () {
      this.$data.loaded = false

      // Load configuration data.
      var component = this
      _getGlobalTopology(this.$store)
        .then(function (response) {
          component.$data.topology = response.data
          component.loaded = true
        }).catch(function (e) {
          component.loaded = true
        })
    },

    // Called after data is loaded.
    onLoaded: function (tenant) {
      var section = {
        id: 'global',
        title: 'Global Microservices',
        icon: 'layers',
        route: '/system/microservices',
        longTitle: 'Manage Global Microservices'
      }
      this.$store.commit('currentSection', section)
    }
  }
}
</script>

<style>
</style>
