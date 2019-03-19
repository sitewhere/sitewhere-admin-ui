import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { IPaging } from "./navigation-model";
import { handleError, formatDate } from "../components/common/Utils";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { AxiosResponse } from "axios";
import { AxiosPromise } from "axios";
import { Route } from "vue-router";
import {
  ISearchCriteria,
  IResponseFormat,
  ISearchResults
} from "sitewhere-rest-api";

// Defines structure of table headers.
export type ITableHeaders = {
  align?: string;
  sortable?: boolean;
  text?: string;
  value?: string;
}[];

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

/**
 * Base class for components that display data for a single record
 * based on SiteWhere REST services.
 */
@Component
export class DetailComponent<T> extends Vue {
  token: string | null = null;
  record: T | null = null;
  loaded: boolean = false;

  // Called on initial create.
  created() {
    this.display(this.$route.params.token);
  }

  // Called when component is reused.
  beforeRouteUpdate(to: Route, from: Route, next: any) {
    console.log("Route updated", to);
    this.display(to.params.token);
    next();
  }

  // Display record with the given token.
  display(token: string) {
    this.token = token;
    this.refresh();
  }

  /** Return promise for loading record */
  loadRecord(
    store: Store<SiteWhereUiSettings>,
    token: string
  ): AxiosPromise<T> {
    throw new Error("Implement loadRecord()");
  }

  // Refresh list contents.
  async refresh() {
    if (!this.token) {
      throw new Error("Token was not provided for detail page.");
    }
    try {
      this.loaded = false;
      let promise: AxiosPromise<T> = this.loadRecord(this.$store, this.token);
      let response: AxiosResponse<T> = await promise;
      this.record = response.data;
      this.afterRecordLoaded(this.record);
    } catch (err) {
      handleError(err);
    }
    this.loaded = true;
  }

  /** Called after record is loaded */
  afterRecordLoaded(record: T): void {
    console.log("Loaded record", record);
  }
}

/**
 * Base class for components that display header data for a
 * SiteWhere entity.
 */
@Component
export class HeaderComponent<T> extends Vue {
  @Prop() readonly record!: T;

  // Handle date formatting in a standard way.
  formatDate(date: Date) {
    return formatDate(date);
  }
}
