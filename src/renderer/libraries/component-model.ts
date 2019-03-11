import Vue from "vue";
import { Component } from "vue-property-decorator";
import { IPaging } from "./navigation-model";
import { handleError } from "../components/common/Utils";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { AxiosResponse } from "axios";
import {
  ISearchCriteria,
  IResponseFormat,
  ISearchResults
} from "sitewhere-rest-api/dist/model/common-model";
import { AxiosPromise } from "axios";

/**
 * Base class for components that display lists based on
 * SiteWhere REST services.
 */
@Component
export class ListComponent<
  T,
  S extends ISearchCriteria,
  F extends IResponseFormat,
  R extends ISearchResults<T>
> extends Vue {
  results: R | null = null;
  paging: IPaging | null = null;
  matches: T[] = [];
  loaded: boolean = false;

  /** Update paging values and run query */
  onPagingUpdated(paging: IPaging) {
    this.paging = paging;
    this.refresh();
  }

  /** Build search criteria for list */
  buildSearchCriteria(): S {
    throw new Error("Implement buildSearchCriteria()");
  }

  /** Build response format for list */
  buildResponseFormat(): F {
    throw new Error("Implement buildResponseFormat()");
  }

  /** Return promise for performing search */
  performSearch(
    store: Store<SiteWhereUiSettings>,
    criteria: S,
    format: F
  ): AxiosPromise<R> {
    throw new Error("Implement performSearch()");
  }

  // Refresh list contents.
  async refresh() {
    let criteria: S = this.buildSearchCriteria();
    let format: F = this.buildResponseFormat();
    if (this.paging) {
      criteria.pageNumber = this.paging.pageNumber;
      criteria.pageSize = this.paging.pageSize;
    }

    try {
      this.loaded = false;
      let promise: AxiosPromise<R> = this.performSearch(
        this.$store,
        criteria,
        format
      );
      let response: AxiosResponse<R> = await promise;
      this.results = response.data;
      this.matches = response.data.results;
    } catch (err) {
      handleError(err);
    }
    this.loaded = true;
  }
}
