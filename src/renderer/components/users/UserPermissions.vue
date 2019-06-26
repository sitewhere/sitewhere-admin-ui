<template>
  <dialog-form>
    <div class="tree-wrapper">
      <v-treeview
        ref="tree"
        selectable
        :items="allPermissions"
        item-children="items"
        item-key="id"
        item-text="text"
        v-model="authorities"
      />
    </div>
  </dialog-form>
</template>

<script lang="ts">
import { Component, DialogSection } from "sitewhere-ide-common";

import DialogForm from "../common/form/DialogForm.vue";

import { handleError } from "../common/Utils";

import { AxiosResponse } from "axios";
import { IGrantedAuthorityHierarchyNode } from "sitewhere-rest-api";
import { getAuthoritiesHierarchy } from "../../rest/sitewhere-users-api";

@Component({
  components: {
    DialogForm
  },
  validations: {}
})
export default class UserPermissions extends DialogSection {
  authorities: string[] = [];
  allPermissions: IGrantedAuthorityHierarchyNode[] = [];

  /** Reset section content */
  async reset() {
    this.authorities = [];
    this.$v.$reset();

    // Reload permissions hierarchy.
    try {
      let response: AxiosResponse<
        IGrantedAuthorityHierarchyNode[]
      > = await getAuthoritiesHierarchy(this.$store);
      this.allPermissions = response.data;
    } catch (err) {
      handleError(err);
    }
  }

  /** Perform validation */
  validate(): boolean {
    this.$v.$touch();
    return !this.$v.$invalid;
  }

  /** Load form data from an object */
  load(input: {}): void {
    this.authorities = (input as any).authorities;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      authorities: this.authorities
    };
  }
}
</script>

<style scoped>
.tree-wrapper {
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
}
</style>
