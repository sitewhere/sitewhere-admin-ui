import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IAreaCreateRequest,
  IArea,
  IAreaSearchCriteria,
  IAreaResponseFormat
} from "sitewhere-rest-api/dist/model/areas-model";
import {
  ISearchCriteria,
  IDateRangeSearchCriteria
} from "sitewhere-rest-api/dist/model/common-model";
import {
  IDeviceAssignmentResponseFormat,
  IDeviceAssignment
} from "sitewhere-rest-api/dist/model/device-assignments-model";
import {
  IDeviceLocation,
  IDeviceMeasurement,
  IDeviceAlert
} from "sitewhere-rest-api/dist/model/device-events-model";

/**
 * Create a new area.
 * @param store
 * @param request
 */
export function createArea(
  store: Store<SiteWhereUiSettings>,
  request: IAreaCreateRequest
): Promise<AxiosResponse<IArea>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IArea> = SiteWhere.API.Areas.createArea(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get an area by token.
 * @param store
 * @param token
 */
export function getArea(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IArea>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IArea> = SiteWhere.API.Areas.getArea(axios, token);
  return loaderWrapper(store, api);
}

/**
 * Update an existing area.
 * @param store
 * @param token
 * @param request
 */
export function updateArea(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IAreaCreateRequest
): Promise<AxiosResponse<IArea>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IArea> = SiteWhere.API.Areas.updateArea(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List areas that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listAreas(
  store: Store<SiteWhereUiSettings>,
  criteria: IAreaSearchCriteria,
  format: IAreaResponseFormat
): Promise<AxiosResponse<IArea[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IArea[]> = SiteWhere.API.Areas.listAreas(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an area.
 * @param store
 * @param token
 */
export function deleteArea(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IArea>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IArea> = SiteWhere.API.Areas.deleteArea(axios, token);
  return loaderWrapper(store, api);
}

/**
 * List assignments for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listAssignmentsForArea(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: ISearchCriteria,
  format: IDeviceAssignmentResponseFormat
): Promise<AxiosResponse<IDeviceAssignment[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignment[]
  > = SiteWhere.API.Areas.listAssignmentsForArea(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * List device location for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 */
export function listLocationsForArea(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria
): Promise<AxiosResponse<IDeviceLocation[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceLocation[]
  > = SiteWhere.API.Areas.listLocationsForArea(axios, token, criteria);
  return loaderWrapper(store, api);
}

/**
 * List measurements for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 */
export function listMeasurementsForArea(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria
): Promise<AxiosResponse<IDeviceMeasurement[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceMeasurement[]
  > = SiteWhere.API.Areas.listMeasurementsForArea(axios, token, criteria);
  return loaderWrapper(store, api);
}

/**
 * List alerts for area based on criteria.
 * @param store
 * @param token
 * @param criteria
 */
export function listAlertsForArea(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria
): Promise<AxiosResponse<IDeviceAlert[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IDeviceAlert[]> = SiteWhere.API.Areas.listAlertsForArea(
    axios,
    token,
    criteria
  );
  return loaderWrapper(store, api);
}
