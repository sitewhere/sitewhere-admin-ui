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
  IDeviceTypeSearchResults,
  IDeviceCommandCreateRequest,
  IDeviceCommand,
  IDeviceCommandResponseFormat,
  IDeviceStatusCreateRequest,
  IDeviceStatus,
  IDeviceStatusResponseFormat
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

/**
 * Create new device command.
 * @param store
 * @param deviceTypeToken
 * @param request
 */
export function createDeviceCommand(
  store: Store<SiteWhereUiSettings>,
  deviceTypeToken: string,
  request: IDeviceCommandCreateRequest
): Promise<AxiosResponse<IDeviceCommand>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommand
  > = SiteWhere.API.DeviceTypes.createDeviceCommand(
    axios,
    deviceTypeToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get device command by token.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 * @param format
 */
export function getDeviceCommand(
  store: Store<SiteWhereUiSettings>,
  deviceTypeToken: string,
  commandToken: string,
  format: IDeviceCommandResponseFormat
): Promise<AxiosResponse<IDeviceCommand>> {
  let axios = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommand
  > = SiteWhere.API.DeviceTypes.getDeviceCommand(
    axios,
    deviceTypeToken,
    commandToken,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device command.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 * @param request
 */
export function updateDeviceCommand(
  store: Store<SiteWhereUiSettings>,
  deviceTypeToken: string,
  commandToken: string,
  request: IDeviceCommandCreateRequest
): Promise<AxiosResponse<IDeviceCommand>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommand
  > = SiteWhere.API.DeviceTypes.updateDeviceCommand(
    axios,
    deviceTypeToken,
    commandToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device command.
 * @param store
 * @param deviceTypeToken
 * @param commandToken
 */
export function deleteDeviceCommand(
  store: Store<SiteWhereUiSettings>,
  deviceTypeToken: string,
  commandToken: string
): Promise<AxiosResponse<IDeviceCommand>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommand
  > = SiteWhere.API.DeviceTypes.deleteDeviceCommand(
    axios,
    deviceTypeToken,
    commandToken
  );
  return loaderWrapper(store, api);
}

/**
 * Create a new device status.
 * @param store
 * @param deviceTypeToken
 * @param request
 */
export function createDeviceStatus(
  store: Store<SiteWhereUiSettings>,
  deviceTypeToken: string,
  request: IDeviceStatusCreateRequest
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = SiteWhere.API.DeviceTypes.createDeviceStatus(
    axios,
    deviceTypeToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 * @param format
 */
export function getDeviceStatus(
  store: Store<SiteWhereUiSettings>,
  deviceTypeToken: string,
  statusToken: string,
  format: IDeviceStatusResponseFormat
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = SiteWhere.API.DeviceTypes.getDeviceStatus(
    axios,
    deviceTypeToken,
    statusToken,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 * @param request
 */
export function updateDeviceStatus(
  store: Store<SiteWhereUiSettings>,
  deviceTypeToken: string,
  statusToken: string,
  request: IDeviceStatusCreateRequest
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = SiteWhere.API.DeviceTypes.updateDeviceStatus(
    axios,
    deviceTypeToken,
    statusToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device status.
 * @param store
 * @param deviceTypeToken
 * @param statusToken
 */
export function deleteDeviceStatus(
  store: Store<SiteWhereUiSettings>,
  deviceTypeToken: string,
  statusToken: string
): Promise<AxiosResponse<IDeviceStatus>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStatus
  > = SiteWhere.API.DeviceTypes.deleteDeviceStatus(
    axios,
    deviceTypeToken,
    statusToken
  );
  return loaderWrapper(store, api);
}
