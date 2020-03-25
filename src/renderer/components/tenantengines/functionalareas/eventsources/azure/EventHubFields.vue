<template>
  <dialog-form>
    <v-flex xs6>
      <form-text
        required
        label="Consumer group name"
        title="Consumer group name."
        v-model="consumerGroupName"
        icon="info"
        class="mr-3"
      >
        <span v-if="!$v.consumerGroupName.required && $v.$dirty"
          >Consumer group name is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="Namespace name"
        title="Namespace name."
        v-model="namespaceName"
        icon="info"
      >
        <span v-if="!$v.namespaceName.required && $v.$dirty"
          >Namespace name is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="Event Hub name"
        title="Event Hub name."
        v-model="eventHubName"
        icon="info"
        class="mr-3"
      >
        <span v-if="!$v.eventHubName.required && $v.$dirty"
          >Event Hub name is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="Host name prefix"
        title="Host name prefix."
        v-model="hostNamePrefix"
        icon="info"
      >
        <span v-if="!$v.hostNamePrefix.required && $v.$dirty"
          >Host name prefix is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="SAS key name"
        title="SAS key name."
        v-model="sasKeyName"
        icon="info"
        class="mr-3"
      >
        <span v-if="!$v.sasKeyName.required && $v.$dirty"
          >SAS key name is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="SAS key"
        title="SAS key."
        v-model="sasKey"
        icon="info"
      >
        <span v-if="!$v.sasKey.required && $v.$dirty"
          >SAS key is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="Storage connection string"
        title="Storage connection string."
        v-model="storageConnectionString"
        icon="info"
        class="mr-3"
      >
        <span v-if="!$v.storageConnectionString.required && $v.$dirty"
          >Storage connection string is required.</span
        >
      </form-text>
    </v-flex>
    <v-flex xs6>
      <form-text
        required
        label="Storage container name"
        title="Storage container name."
        v-model="storageContainerName"
        icon="info"
      >
        <span v-if="!$v.storageContainerName.required && $v.$dirty"
          >Storage container name is required.</span
        >
      </form-text>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";
import { IEventHubConfiguration } from "sitewhere-configuration-model";

import DialogForm from "../../../../common/form/DialogForm.vue";
import FormText from "../../../../common/form/FormText.vue";

import { required } from "vuelidate/lib/validators";

@Component({
  components: {
    DialogForm,
    FormText
  },
  validations: {
    consumerGroupName: {
      required
    },
    namespaceName: {
      required
    },
    eventHubName: {
      required
    },
    sasKeyName: {
      required
    },
    sasKey: {
      required
    },
    storageConnectionString: {
      required
    },
    storageContainerName: {
      required
    },
    hostNamePrefix: {
      required
    }
  }
})
export default class EventHubFields extends DialogSection {
  consumerGroupName: string = "";
  namespaceName: string = "";
  eventHubName: string = "";
  sasKeyName: string = "";
  sasKey: string = "";
  storageConnectionString: string = "";
  storageContainerName: string = "";
  hostNamePrefix: string = "";

  /** Reset section content */
  reset(): void {
    this.consumerGroupName = "";
    this.namespaceName = "";
    this.eventHubName = "";
    this.sasKeyName = "";
    this.sasKey = "";
    this.storageConnectionString = "";
    this.storageContainerName = "";
    this.hostNamePrefix = "";
    this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: IEventHubConfiguration): void {
    this.consumerGroupName = input.consumerGroupName || "";
    this.namespaceName = input.namespaceName || "";
    this.eventHubName = input.eventHubName || "";
    this.sasKeyName = input.sasKeyName || "";
    this.sasKey = input.sasKey || "";
    this.storageConnectionString = input.storageConnectionString || "";
    this.storageContainerName = input.storageContainerName || "";
    this.hostNamePrefix = input.hostNamePrefix || "";
  }

  /** Save form data to an object */
  save(): {} {
    return {
      consumerGroupName: this.consumerGroupName,
      namespaceName: this.namespaceName,
      eventHubName: this.eventHubName,
      sasKeyName: this.sasKeyName,
      sasKey: this.sasKey,
      storageConnectionString: this.storageConnectionString,
      storageContainerName: this.storageContainerName,
      hostNamePrefix: this.hostNamePrefix
    };
  }
}
</script>
