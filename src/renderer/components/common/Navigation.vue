<template>
  <v-list v-if="sections" dense>
    <v-list-group
      v-for="section in sections"
      :key="section.id"
      v-model="section.active"
      :prepend-icon="section.icon"
      no-action
    >
      <template v-slot:activator>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ section.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <v-list-tile v-for="subsection in section.subsections" :key="subsection.id">
        <v-list-tile-content>
          <v-list-tile-title>{{ subsection.title }}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon>{{ subsection.icon }}</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script>
import { isAuthForAll } from "./Utils";

export default {
  data: () => ({
    sites: null,
    drawerEdit: true
  }),

  props: ["sections"],

  methods: {
    // Determines whether user is authorized for section.
    isAuthForSection: function(section) {
      if (section.requireAll) {
        return isAuthForAll(this, section.requireAll);
      }
      return true;
    },

    onSectionClicked: function(section) {
      this.$emit("sectionSelected", section);
    }
  }
};
</script>

<style scoped>
.list__tile__action {
  min-width: 30px;
}
.list__tile__title {
  font-size: 16px;
}
</style>
