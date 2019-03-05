import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceStatusCreateRequest,
  IDeviceStatus,
  IDeviceStatusSearchCriteria,
  IDeviceStatusResponseFormat,
  IDeviceStatusSearchResults
} from "sitewhere-rest-api/dist/model/device-statuses-model";

/**
 * Create a new device status.
 * @param store
 * @param request
 */
export function createDeviceStatus(
  store: Store<SiteWhereUiSettings>,
  request: IDeviceStatusCreateRequest
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = SiteWhere.API.DeviceStatuses.createDeviceStatus(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Update an existing device status.
 * @param store
 * @param token
 */
export function getDeviceStatus(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = SiteWhere.API.DeviceStatuses.getDeviceStatus(axios, token);
  return loaderWrapper(store, api);
}

/**
 * Update an existing device status.
 * @param store
 * @param token
 * @param request
 */
export function updateDeviceStatus(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IDeviceStatusCreateRequest
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = SiteWhere.API.DeviceStatuses.updateDeviceStatus(axios, token, request);
  return loaderWrapper(store, api);
}

/**
 * List device statuses that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceStatuses(
  store: Store<SiteWhereUiSettings>,
  criteria: IDeviceStatusSearchCriteria,
  format: IDeviceStatusResponseFormat
): Promise<AxiosResponse<IDeviceStatusSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatusSearchResults
  > = SiteWhere.API.DeviceStatuses.listDeviceStatuses(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device status.
 * @param store
 * @param token
 */
export function deleteDeviceStatus(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = SiteWhere.API.DeviceStatuses.deleteDeviceStatus(axios, token);
  return loaderWrapper(store, api);
}
