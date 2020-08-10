<template>
  <v-card flat v-show="identifier">
    <div class="caption text-center text-truncate font-weight-bold">{{ label }}</div>
    <div class="text-center">
      <v-avatar size="40">
        <img :src="imageUrl" v-show="imageUrl" />
      </v-avatar>
    </div>
    <div class="caption text-center text-truncate pl-2 pr-2">{{ name }}</div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

@Component({
  components: {},
})
export default class AssociationAvatar extends Vue {
  @Prop() readonly identifier!: string;
  @Prop() readonly label!: string;
  @Prop() readonly imageUrl!: string;
  @Prop() readonly name!: string;
}
</script>
