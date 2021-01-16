<template>
  <v-container class="ma-0 pl-0" fluid>
    <v-layout wrap>
      <v-flex xs8>
        <v-text-field
          :label="label"
          :title="title"
          :readonly="true"
          class="text-field-input"
          placeholder=" "
          v-model="updatedColor"
          prepend-icon="color_lens"
        />
      </v-flex>
      <v-flex xs4>
        <v-menu offset-y top :close-on-content-click="false" v-model="menu">
          <template v-slot:activator="{ on }">
            <v-btn
              class="mt-3 ml-3"
              v-on="on"
              :style="{ 'background-color': valueOrDefault }"
            />
          </template>
          <v-color-picker
            :value="valueOrDefault"
            @input="onColorChosen"
            :mode="mode || 'hexa'"
          />
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";

@Component({
  components: {},
})
export default class ColorInputField extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly label!: string;
  @Prop() readonly title!: string;
  @Prop() readonly mode!: string;

  menu: string | null = null;
  updatedColor: string | null = null;

  @Watch("value")
  onValueChanged(val: string) {
    if (val && !val.startsWith("#")) {
      val = "#" + val;
    }
    this.updatedColor = val;
  }

  get valueOrDefault() {
    return this.updatedColor || "#fff";
  }

  /** Called when color is chosen */
  onColorChosen(val: string) {
    this.updatedColor = val;
    this.$emit("input", val);
  }
}
</script>

<style scoped>
.text-field-input >>> i.v-icon {
  font-size: 16px;
  color: #ccc;
}
</style>