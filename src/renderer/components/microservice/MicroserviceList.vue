<template>
  <v-list v-if="topology" two-line dense>
    <template v-for="microservice in topology">
      <v-list-tile :key="microservice.identifier" @click="onMicroserviceClicked(microservice)">
        <v-list-tile-avatar>
          <font-awesome-icon
            class="mt-2 ml-2 grey--text text--darken-2"
            :icon="microservice.icon"
            size="2x"
          />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="microservice.name" class="subheading"/>
          <v-list-tile-sub-title v-html="microservice.description"/>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider :key="'div-' + microservice.identifier"/>
    </template>
  </v-list>
</template>

<script>
export default {
  data: () => ({}),

  props: ["topology"],

  methods: {
    // Called if a microservice is clicked.
    onMicroserviceClicked: function(microservice) {
      this.$emit("microserviceClicked", microservice);
    }
  }
};
</script>

<style>
</style>
