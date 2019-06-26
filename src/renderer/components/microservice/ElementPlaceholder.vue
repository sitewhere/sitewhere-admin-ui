<template>
  <v-toolbar v-if="contextElement.optional" flat class="grey lighten-5 pa-1">
    <font-awesome-icon class="grey--text text--darken-2" icon="plus" size="lg"/>
    <v-toolbar-title class="black--text">{{ contextElement.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y left>
      <v-btn dark class="grey" slot="activator">Add Component</v-btn>
      <v-list dense>
        <v-list-tile
          v-for="option in contextElement.options"
          :key="option.name"
          @click="onAddComponent(option)"
        >
          <v-list-tile-title class="subheading">
            <font-awesome-icon
              class="mr-1 grey--text text--darken-2"
              :icon="option.icon"
              size="lg"
            />
            {{ option.name }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
  <v-toolbar v-else flat class="grey lighten-5">
    <v-icon light class="fa-lg red--text text--darken-3">fa-warning</v-icon>
    <v-toolbar-title class="black--text">{{ contextElement.name }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y left>
      <v-btn dark class="red darken-3 mr-0" slot="activator">Add Required Component</v-btn>
      <v-list dense>
        <v-list-tile
          v-for="option in contextElement.options"
          :key="option.name"
          @click="onAddComponent(option)"
        >
          <v-list-tile-title class="subheading">
            <font-awesome-icon
              class="mr-1 grey--text text--darken-2"
              :icon="option.icon"
              size="lg"
            />
            {{ option.name }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";
import { IConfiguredElement } from "./ConfigurationModel";
import { IElementNode } from "sitewhere-rest-api";

@Component({})
export default class ElementPlaceholder extends Vue {
  @Prop() readonly contextElement!: IConfiguredElement;

  /** Fire event to add chosen node type */
  onAddComponent(option: IElementNode) {
    this.$emit("addComponent", option);
  }
}
</script>
