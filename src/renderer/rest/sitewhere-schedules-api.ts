import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IScheduleCreateRequest,
  ISchedule,
  IScheduleSearchCriteria,
  IScheduleResponseFormat,
  IScheduleSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new schedule.
 * @param store
 * @param request
 */
export function createSchedule(
  store: Store<SiteWhereUiSettings>,
  request: IScheduleCreateRequest
): Promise<AxiosResponse<ISchedule>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ISchedule> = SiteWhere.API.Schedules.createSchedule(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get schedule by token.
 * @param store
 * @param token
 * @param format
 */
export function getSchedule(
  store: Store<SiteWhereUiSettings>,
  token: string,
  format: IScheduleResponseFormat
): Promise<AxiosResponse<ISchedule>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ISchedule> = SiteWhere.API.Schedules.getSchedule(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing schedule.
 * @param store
 * @param token
 * @param request
 */
export function updateSchedule(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IScheduleCreateRequest
): Promise<AxiosResponse<ISchedule>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ISchedule> = SiteWhere.API.Schedules.updateSchedule(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing schedule.
 * @param store
 * @param token
 */
export function deleteSchedule(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<ISchedule>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ISchedule> = SiteWhere.API.Schedules.deleteSchedule(
    axios,
    token
  );
  return loaderWrapper(store, api);
}

/**
 * List schedules that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listSchedules(
  store: Store<SiteWhereUiSettings>,
  criteria: IScheduleSearchCriteria,
  format: IScheduleResponseFormat
): Promise<AxiosResponse<IScheduleSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IScheduleSearchResults
  > = SiteWhere.API.Schedules.listSchedules(axios, criteria, format);
  return loaderWrapper(store, api);
}
