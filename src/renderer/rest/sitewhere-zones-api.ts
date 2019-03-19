import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IZoneCreateRequest,
  IZone,
  IZoneSearchCriteria,
  IZoneResponseFormat,
  IZoneSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new zone.
 * @param store
 * @param request
 */
export function createZone(
  store: Store<SiteWhereUiSettings>,
  request: IZoneCreateRequest
): Promise<AxiosResponse<IZone>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZone> = SiteWhere.API.Zones.createZone(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get a zone by unique token.
 * @param store
 * @param token
 */
export function getZone(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IZone>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZone> = SiteWhere.API.Zones.getZone(axios, token);
  return loaderWrapper(store, api);
}

/**
 * Update an existing zone.
 * @param store
 * @param token
 * @param request
 */
export function updateZone(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IZoneCreateRequest
): Promise<AxiosResponse<IZone>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZone> = SiteWhere.API.Zones.updateZone(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List zones that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listZones(
  store: Store<SiteWhereUiSettings>,
  criteria: IZoneSearchCriteria,
  format: IZoneResponseFormat
): Promise<AxiosResponse<IZoneSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZoneSearchResults> = SiteWhere.API.Zones.listZones(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing zone.
 * @param store
 * @param token
 */
export function deleteZone(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IZone>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IZone> = SiteWhere.API.Zones.deleteZone(axios, token);
  return loaderWrapper(store, api);
}
