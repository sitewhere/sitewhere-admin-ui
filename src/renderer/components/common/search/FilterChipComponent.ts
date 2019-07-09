import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { handleError } from "../Utils";
import { AxiosPromise, AxiosResponse } from "axios";

/**
 * Base class for create dialogs.
 */
@Component
export class FilterChipComponent<T> extends Vue {
  @Prop() readonly token!: string;
  @Prop() readonly tooltip!: string;

  record: T | null = null;

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

  /** Called when close button is clicked */
  onFilterClosed() {
    this.$emit("closed", this.token);
  }
}
