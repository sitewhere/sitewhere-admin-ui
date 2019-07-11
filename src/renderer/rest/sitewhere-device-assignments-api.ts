import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceAssignmentCreateRequest,
  IDeviceAssignment,
  IDeviceAssignmentSimpleCriteria,
  IDeviceAssignmentSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults,
  IDeviceMeasurementCreateRequest,
  IDeviceMeasurement,
  IChartSeries,
  IDeviceLocationCreateRequest,
  IDeviceLocation,
  IDeviceAlertCreateRequest,
  IDeviceAlert,
  IDeviceCommandInvocationCreateRequest,
  IDeviceCommandInvocation,
  IDeviceMeasurementSearchResults,
  IDeviceLocationSearchResults,
  IDeviceAlertSearchResults,
  IDeviceCommandInvocationSearchResults,
  IDeviceCommandResponseSearchResults,
  IDateRangeSearchCriteria,
  IDeviceMeasurementResponseFormat,
  IDeviceAlertResponseFormat,
  IDeviceLocationResponseFormat,
  IDeviceCommandInvocationResponseFormat,
  IDeviceCommandResponseResponseFormat
} from "sitewhere-rest-api";

/**
 * Create a device assignment.
 * @param store
 * @param request
 */
export function createDeviceAssignment(
  store: Store<SiteWhereUiSettings>,
  request: IDeviceAssignmentCreateRequest
): Promise<AxiosResponse<IDeviceAssignment>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignment
  > = SiteWhere.API.DeviceAssignments.createDeviceAssignment(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get a device assignment by token.
 * @param store
 * @param token
 * @param format
 */
export function getDeviceAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  format: IDeviceAssignmentResponseFormat
): Promise<AxiosResponse<IDeviceAssignment>> {
  let axios = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignment
  > = SiteWhere.API.DeviceAssignments.getDeviceAssignment(axios, token, format);
  return loaderWrapper(store, api);
}

/**
 * List device assignments that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceAssignments(
  store: Store<SiteWhereUiSettings>,
  criteria: IDeviceAssignmentSimpleCriteria,
  format: IDeviceAssignmentResponseFormat
): Promise<AxiosResponse<IDeviceAssignmentSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignmentSearchResults
  > = SiteWhere.API.DeviceAssignments.listDeviceAssignments(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Search device assignments that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function searchDeviceAssignments(
  store: Store<SiteWhereUiSettings>,
  criteria: IDeviceAssignmentSearchCriteria,
  format: IDeviceAssignmentResponseFormat
): Promise<AxiosResponse<IDeviceAssignmentSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignmentSearchResults
  > = SiteWhere.API.DeviceAssignments.searchDeviceAssignments(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing device assignment.
 * @param store
 * @param token
 */
export function deleteDeviceAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IDeviceAssignment>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignment
  > = SiteWhere.API.DeviceAssignments.deleteDeviceAssignment(axios, token);
  return loaderWrapper(store, api);
}

/**
 * Create measurement event for assignment.
 * @param store
 * @param token
 * @param request
 */
export function createMeasurementsForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IDeviceMeasurementCreateRequest
): Promise<AxiosResponse<IDeviceMeasurement>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceMeasurement
  > = SiteWhere.API.DeviceAssignments.createMeasurementForAssignment(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List measurement events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listMeasurementsForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria,
  format: IDeviceMeasurementResponseFormat
): Promise<AxiosResponse<IDeviceMeasurementSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceMeasurementSearchResults
  > = SiteWhere.API.DeviceAssignments.listMeasurementsForAssignment(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * List measurement events for assignment in chart series format.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listMeasurementsForAssignmentAsChartSeries(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria,
  format: IDeviceMeasurementResponseFormat
): Promise<AxiosResponse<IChartSeries<number>>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IChartSeries<number>
  > = SiteWhere.API.DeviceAssignments.listMeasurementsForAssignmentAsChartSeries(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Create location event for a device assignment.
 * @param store
 * @param token
 * @param request
 */
export function createLocationForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IDeviceLocationCreateRequest
): Promise<AxiosResponse<IDeviceLocation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceLocation
  > = SiteWhere.API.DeviceAssignments.createLocationForAssignment(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List location events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listLocationsForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria,
  format: IDeviceLocationResponseFormat
): Promise<AxiosResponse<IDeviceLocationSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceLocationSearchResults
  > = SiteWhere.API.DeviceAssignments.listLocationsForAssignment(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Create alert event for a device assignment.
 * @param store
 * @param token
 * @param request
 */
export function createAlertForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IDeviceAlertCreateRequest
): Promise<AxiosResponse<IDeviceAlert>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAlert
  > = SiteWhere.API.DeviceAssignments.createAlertForAssignment(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List alert events for an assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 */
export function listAlertsForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria,
  format: IDeviceAlertResponseFormat
): Promise<AxiosResponse<IDeviceAlertSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAlertSearchResults
  > = SiteWhere.API.DeviceAssignments.listAlertsForAssignment(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Create command invocation event for an assignment.
 * @param store
 * @param token
 * @param request
 */
export function createCommandInvocationForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IDeviceCommandInvocationCreateRequest
): Promise<AxiosResponse<IDeviceCommandInvocation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommandInvocation
  > = SiteWhere.API.DeviceAssignments.createCommandInvocationForAssignment(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Schedule command invocation event for a future time.
 * @param store
 * @param token
 * @param scheduleToken
 * @param request
 */
export function scheduleCommandInvocation(
  store: Store<SiteWhereUiSettings>,
  token: string,
  scheduleToken: string,
  request: IDeviceCommandInvocationCreateRequest
): Promise<AxiosResponse<IDeviceCommandInvocation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommandInvocation
  > = SiteWhere.API.DeviceAssignments.scheduleCommandInvocationForAssignment(
    axios,
    token,
    scheduleToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List command invocation events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listCommandInvocationsForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria,
  format: IDeviceCommandInvocationResponseFormat
): Promise<AxiosResponse<IDeviceCommandInvocationSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommandInvocationSearchResults
  > = SiteWhere.API.DeviceAssignments.listCommandInvocationsForAssignment(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * List command response events for assignment that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listCommandResponsesForAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria,
  format: IDeviceCommandResponseResponseFormat
): Promise<AxiosResponse<IDeviceCommandResponseSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommandResponseSearchResults
  > = SiteWhere.API.DeviceAssignments.listCommandResponsesForAssignment(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Release an active device assignment.
 * @param store
 * @param token
 */
export function releaseAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IDeviceAssignment>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignment
  > = SiteWhere.API.DeviceAssignments.releaseDeviceAssignment(axios, token);
  return loaderWrapper(store, api);
}

/**
 * Mark a device assignment as missing.
 * @param store
 * @param token
 */
export function missingAssignment(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IDeviceAssignment>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignment
  > = SiteWhere.API.DeviceAssignments.missingDeviceAssignment(axios, token);
  return loaderWrapper(store, api);
}
