import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceTypeCreateRequest,
  IDeviceType,
  IDeviceTypeSearchCriteria,
  IDeviceTypeResponseFormat,
  IDeviceTypeSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new device type.
 * @param store
 * @param request
 */
export function createDeviceType(
  store: Store<SiteWhereUiSettings>,
  request: IDeviceTypeCreateRequest
): Promise<AxiosResponse<IDeviceType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceType
  > = SiteWhere.API.DeviceTypes.createDeviceType(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get device type by token.
 * @param store
 * @param token
 * @param format
 */
export function getDeviceType(
  store: Store<SiteWhereUiSettings>,
  token: string,
  format: IDeviceTypeResponseFormat
): Promise<AxiosResponse<IDeviceType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IDeviceType> = SiteWhere.API.DeviceTypes.getDeviceType(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device type.
 * @param store
 * @param token
 * @param request
 */
export function updateDeviceType(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IDeviceTypeCreateRequest
): Promise<AxiosResponse<IDeviceType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceType
  > = SiteWhere.API.DeviceTypes.updateDeviceType(axios, token, request);
  return loaderWrapper(store, api);
}

/**
 * List device types that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceTypes(
  store: Store<SiteWhereUiSettings>,
  criteria: IDeviceTypeSearchCriteria,
  format: IDeviceTypeResponseFormat
): Promise<AxiosResponse<IDeviceTypeSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceTypeSearchResults
  > = SiteWhere.API.DeviceTypes.listDeviceTypes(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device type.
 * @param store
 * @param token
 */
export function deleteDeviceType(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IDeviceType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceType
  > = SiteWhere.API.DeviceTypes.deleteDeviceType(axios, token);
  return loaderWrapper(store, api);
}
