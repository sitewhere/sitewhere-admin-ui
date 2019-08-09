import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import { handleError } from "../Utils";
import { AxiosPromise, AxiosResponse } from "axios";
import { IBrandedEntity } from "sitewhere-rest-api";

/**
 * Base class for filter chip components.
 */
@Component
export class FilterChipComponent<T extends IBrandedEntity> extends Vue {
  @Prop() readonly token!: string;
  @Prop() readonly tooltip!: string;

  record: T | null = null;

  @Watch("token", { immediate: true })
  onSelectionUpdated(updated: string) {
    this.refresh();
  }

  /** Return method to load record */
  load(): AxiosPromise<T> | T {
    throw new Error("Must implement load() method.");
  }

  /** Type guard to differentiate between responses */
  isAxiosResponse(
    response: AxiosResponse<T> | T
  ): response is AxiosResponse<T> {
    return (<AxiosResponse<T>>response).data !== undefined;
  }

  /** Refresh record content based on token */
  async refresh() {
    try {
      let response: AxiosResponse<T> | T = await this.load();
      this.record = this.isAxiosResponse(response) ? response.data : response;
    } catch (err) {
      handleError(err);
    }
  }

  /** Get image information */
  get image() {
    return this.record ? this.record.imageUrl : null;
  }

  /** Get label information */
  get label() {
    return this.record ? (this.record as any).name : null;
  }

  /** Called when close button is clicked */
  onFilterClosed() {
    this.$emit("closed", this.token);
  }
}
