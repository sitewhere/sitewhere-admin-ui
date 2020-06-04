<template>
  <content-section icon="fa-sitemap" :fa="true" title="Command Router">
    <v-card flat v-if="router">
      <device-type-mapping-router-summary
        v-if="isDeviceTypeMappingRouter"
        class="mb-2"
        :destinations="destinations"
        :router="router"
        @update="onCommandRouterUpdate"
      />
      <content-link
        icon="fa-trash"
        text="Unset command router"
        @linkClicked="onUnsetCommandRouter"
      />
    </v-card>
    <v-card flat v-else>
      <content-warning
        text="No command router is set. This will cause tenant engine startup to fail!"
      />
      <content-link
        class="mt-3"
        icon="fa-plus-circle"
        text="Add new command router"
        @linkClicked="onAddCommandRouter"
      />
    </v-card>
    <new-command-router-chooser ref="chooser" @chosen="onCommandRouterChosen" />
    <device-type-mapping-router-create-dialog ref="dtmRouterCreate" />
  </content-section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Ref } from "vue-property-decorator";
import {
  IRouterGenericConfiguration,
  ICommandDestinationGenericConfiguration
} from "sitewhere-configuration-model";

import NewCommandRouterChooser from "./NewCommandRouterChooser.vue";
import DeviceTypeMappingRouterSummary from "./routers/devicetypemapping/Summary.vue";
import DeviceTypeMappingRouterCreateDialog from "./routers/devicetypemapping/SettingsCreateDialog.vue";

import {
  ContentSection,
  ContentLink,
  ContentWarning
} from "sitewhere-ide-components";
import { VCard } from "vuetify/lib";

@Component({
  components: {
    VCard,
    ContentSection,
    ContentLink,
    ContentWarning,
    NewCommandRouterChooser,
    DeviceTypeMappingRouterSummary,
    DeviceTypeMappingRouterCreateDialog
  }
})
export default class CommandRouterSection extends Vue {
  @Prop() readonly router!: IRouterGenericConfiguration;
  @Prop() readonly destinations!: ICommandDestinationGenericConfiguration[];
  @Ref() readonly chooser!: NewCommandRouterChooser;
  @Ref() readonly dtmRouterCreate!: DeviceTypeMappingRouterCreateDialog;

  /** Check for device type mapping router */
  get isDeviceTypeMappingRouter(): boolean {
    return this.router && this.router.type == "device-type-mapping";
  }

  /** Send event to unset the router */
  onUnsetCommandRouter(): void {
    this.$emit("unset");
  }

  /** Open chooser for adding command router */
  onAddCommandRouter(): void {
    this.chooser.openChooser();
  }

  /** Show dialog for creating command router */
  onCommandRouterChosen(type: string): void {
    if (type == "device-type-mapping") {
      this.dtmRouterCreate.openDialog();
    }
  }

  /** Indicate that updates were made to command router */
  onCommandRouterUpdate(): void {
    this.$emit("update");
  }
}
</script>
