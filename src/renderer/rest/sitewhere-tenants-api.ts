import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  ITenantCreateRequest,
  ITenant,
  ITenantSearchCriteria,
  ITenantResponseFormat,
  ITenantTemplate,
  IDatasetTemplate,
  ITenantSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new system tenant.
 * @param store
 * @param request
 */
export function createTenant(
  store: Store<SiteWhereUiSettings>,
  request: ITenantCreateRequest
): Promise<AxiosResponse<ITenant>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenant> = SiteWhere.API.Tenants.createTenant(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get system tenant by token.
 * @param store
 * @param token
 * @param format
 */
export function getTenant(
  store: Store<SiteWhereUiSettings>,
  token: string,
  format: ITenantResponseFormat
): Promise<AxiosResponse<ITenant>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenant> = SiteWhere.API.Tenants.getTenant(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing system tenant.
 * @param store
 * @param token
 * @param request
 */
export function updateTenant(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: ITenantCreateRequest
): Promise<AxiosResponse<ITenant>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenant> = SiteWhere.API.Tenants.updateTenant(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List system tenants that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listTenants(
  store: Store<SiteWhereUiSettings>,
  criteria: ITenantSearchCriteria,
  format: ITenantResponseFormat
): Promise<AxiosResponse<ITenantSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ITenantSearchResults
  > = SiteWhere.API.Tenants.listTenants(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * Delete an existing system tenant.
 * @param store
 * @param token
 */
export function deleteTenant(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<ITenant>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenant> = SiteWhere.API.Tenants.deleteTenant(
    axios,
    token
  );
  return loaderWrapper(store, api);
}

/**
 * List available tenant templates.
 * @param store
 */
export function listTenantTemplates(
  store: Store<SiteWhereUiSettings>
): Promise<AxiosResponse<ITenantTemplate[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ITenantTemplate[]
  > = SiteWhere.API.Tenants.listTenantTemplates(axios);
  return loaderWrapper(store, api);
}

/**
 * List available dataset templates.
 * @param store
 */
export function listDatasetTemplates(
  store: Store<SiteWhereUiSettings>
): Promise<AxiosResponse<IDatasetTemplate[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDatasetTemplate[]
  > = SiteWhere.API.Tenants.listDatasetTemplates(axios);
  return loaderWrapper(store, api);
}
