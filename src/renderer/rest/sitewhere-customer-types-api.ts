import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  ICustomerTypeCreateRequest,
  ICustomerType,
  ICustomerTypeSearchCriteria,
  ICustomerTypeResponseFormat,
  ICustomerTypeSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new customer type.
 * @param store
 * @param request
 */
export function createCustomerType(
  store: Store<SiteWhereUiSettings>,
  request: ICustomerTypeCreateRequest
): Promise<AxiosResponse<ICustomerType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ICustomerType
  > = SiteWhere.API.CustomerTypes.createCustomerType(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get customer type by token.
 * @param store
 * @param token
 */
export function getCustomerType(
  store: Store<SiteWhereUiSettings>,
  token: string,
  format: ICustomerTypeResponseFormat
): Promise<AxiosResponse<ICustomerType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ICustomerType
  > = SiteWhere.API.CustomerTypes.getCustomerType(axios, token, format);
  return loaderWrapper(store, api);
}

/**
 * Update an existing customer type.
 * @param store
 * @param token
 * @param request
 */
export function updateCustomerType(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: ICustomerTypeCreateRequest
): Promise<AxiosResponse<ICustomerType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ICustomerType
  > = SiteWhere.API.CustomerTypes.updateCustomerType(axios, token, request);
  return loaderWrapper(store, api);
}

/**
 * List customer types that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listCustomerTypes(
  store: Store<SiteWhereUiSettings>,
  criteria: ICustomerTypeSearchCriteria,
  format: ICustomerTypeResponseFormat
): Promise<AxiosResponse<ICustomerTypeSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ICustomerTypeSearchResults
  > = SiteWhere.API.CustomerTypes.listCustomerTypes(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * Delete an existing customer type.
 * @param store
 * @param token
 */
export function deleteCustomerType(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<ICustomerType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ICustomerType
  > = SiteWhere.API.CustomerTypes.deleteCustomerType(axios, token);
  return loaderWrapper(store, api);
}
