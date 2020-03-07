<template>
  <v-card @click="onLinkClicked" flat class="caption mb-1">
    <a class="clink">{{ text }}</a
    ><v-icon class="ilink">{{ icon }}</v-icon>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({
  components: {}
})
export default class ContentLink extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly text!: string;

  onLinkClicked() {
    this.$emit("linkClicked");
  }
}
</script>

<style scoped>
.clink {
  color: #2255cc;
  font-size: 13px;
}
.clink:hover {
  text-decoration: underline;
}
.ilink {
  color: #2255cc;
  line-height: 1.17;
  font-size: 11px;
  margin-left: 5px;
}
</style>
