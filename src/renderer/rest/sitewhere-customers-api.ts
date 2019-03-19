import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  ICustomerCreateRequest,
  ICustomer,
  ICustomerSearchCriteria,
  ICustomerResponseFormat,
  ICustomerSearchResults,
  ISearchCriteria,
  IDateRangeSearchCriteria,
  IDeviceAssignmentResponseFormat,
  IDeviceAssignmentSearchResults,
  IDeviceLocationSearchResults,
  IDeviceMeasurementSearchResults,
  IDeviceAlertSearchResults,
  IDeviceLocationResponseFormat,
  IDeviceMeasurementResponseFormat,
  IDeviceAlertResponseFormat
} from "sitewhere-rest-api";

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
 * @param format
 */
export function getCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  format: ICustomerResponseFormat
): Promise<AxiosResponse<ICustomer>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ICustomer> = SiteWhere.API.Customers.getCustomer(
    axios,
    token,
    format
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
): Promise<AxiosResponse<ICustomerSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ICustomerSearchResults
  > = SiteWhere.API.Customers.listCustomers(axios, criteria, format);
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
): Promise<AxiosResponse<IDeviceAssignmentSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAssignmentSearchResults
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
 * @param format
 */
export function listLocationsForCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria?: IDateRangeSearchCriteria,
  format?: IDeviceLocationResponseFormat
): Promise<AxiosResponse<IDeviceLocationSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceLocationSearchResults
  > = SiteWhere.API.Customers.listLocationsForCustomer(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * List device measurements for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listMeasurementsForCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria?: IDateRangeSearchCriteria,
  format?: IDeviceMeasurementResponseFormat
): Promise<AxiosResponse<IDeviceMeasurementSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceMeasurementSearchResults
  > = SiteWhere.API.Customers.listMeasurementsForCustomer(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * List device alerts for a customer based on criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listAlertsForCustomer(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria?: IDateRangeSearchCriteria,
  format?: IDeviceAlertResponseFormat
): Promise<AxiosResponse<IDeviceAlertSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceAlertSearchResults
  > = SiteWhere.API.Customers.listAlertsForCustomer(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}
