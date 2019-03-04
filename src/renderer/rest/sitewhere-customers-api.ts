import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  ICustomerCreateRequest,
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat
} from "sitewhere-rest-api/dist/model/customers-model";
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
 * Create a new customer.
 * @param store
 * @param request
 */
export function createCustomer(
  store: Store<SiteWhereUiSettings>,
  request: ICustomerCreateRequest
): Promise<AxiosResponse<ICustomer>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ICustomer> = SiteWhere.API.Customers.createCustomer(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get customer by token.
 * @param store
 * @param token
 */
export function getCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<ICustomer>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ICustomer> = SiteWhere.API.Customers.getCustomer(
    axios,
    token
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing customer.
 * @param store
 * @param token
 * @param request
 */
export function updateCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: ICustomerCreateRequest
): Promise<AxiosResponse<ICustomer>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ICustomer> = SiteWhere.API.Customers.updateCustomer(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List customers that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listCustomers(
  store: Store<SiteWhereUiSettings>,
  criteria: ICustomerSearchCriteria,
  format: ICustomerResponseFormat
): Promise<AxiosResponse<ICustomer[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ICustomer[]> = SiteWhere.API.Customers.listCustomers(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing customer.
 * @param store
 * @param token
 */
export function deleteCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<ICustomer>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ICustomer> = SiteWhere.API.Customers.deleteCustomer(
    axios,
    token
  );
  return loaderWrapper(store, api);
}

/**
 * List device assignments for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listAssignmentsForCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: ISearchCriteria,
  format: IDeviceAssignmentResponseFormat
): Promise<AxiosResponse<IDeviceAssignment[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignment[]
  > = SiteWhere.API.Customers.listAssignmentsForCustomer(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * List device locations for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 */
export function listLocationsForCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria
): Promise<AxiosResponse<IDeviceLocation[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceLocation[]
  > = SiteWhere.API.Customers.listLocationsForCustomer(axios, token, criteria);
  return loaderWrapper(store, api);
}

/**
 * List device measurements for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 */
export function listMeasurementsForCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria
): Promise<AxiosResponse<IDeviceMeasurement[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceMeasurement[]
  > = SiteWhere.API.Customers.listMeasurementsForCustomer(
    axios,
    token,
    criteria
  );
  return loaderWrapper(store, api);
}

/**
 * List device alerts for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 */
export function listAlertsForCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: IDateRangeSearchCriteria
): Promise<AxiosResponse<IDeviceAlert[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAlert[]
  > = SiteWhere.API.Customers.listAlertsForCustomer(axios, token, criteria);
  return loaderWrapper(store, api);
}
