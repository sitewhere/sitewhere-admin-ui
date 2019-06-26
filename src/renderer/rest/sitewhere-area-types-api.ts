import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IAreaTypeCreateRequest,
  IAreaType,
  IAreaTypeSearchCriteria,
  IAreaTypeResponseFormat,
  IAreaTypeSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new area type.
 * @param store
 * @param request
 */
export function createAreaType(
  store: Store<SiteWhereUiSettings>,
  request: IAreaTypeCreateRequest
): Promise<AxiosResponse<IAreaType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAreaType> = SiteWhere.API.AreaTypes.createAreaType(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get an area type by token.
 * @param store
 * @param token
 * @param format
 */
export function getAreaType(
  store: Store<SiteWhereUiSettings>,
  token: string,
  format: IAreaTypeResponseFormat
): Promise<AxiosResponse<IAreaType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAreaType> = SiteWhere.API.AreaTypes.getAreaType(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing area type.
 * @param store
 * @param token
 * @param request
 */
export function updateAreaType(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IAreaTypeCreateRequest
): Promise<AxiosResponse<IAreaType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAreaType> = SiteWhere.API.AreaTypes.updateAreaType(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List area types that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listAreaTypes(
  store: Store<SiteWhereUiSettings>,
  criteria: IAreaTypeSearchCriteria,
  format: IAreaTypeResponseFormat
): Promise<AxiosResponse<IAreaTypeSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IAreaTypeSearchResults
  > = SiteWhere.API.AreaTypes.listAreaTypes(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * Delete an existing area type.
 * @param store
 * @param token
 */
export function deleteAreaType(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IAreaType>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAreaType> = SiteWhere.API.AreaTypes.deleteAreaType(
    axios,
    token
  );
  return loaderWrapper(store, api);
}
