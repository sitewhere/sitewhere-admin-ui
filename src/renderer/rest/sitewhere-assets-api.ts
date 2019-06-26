import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IAssetCreateRequest,
  IAsset,
  IAssetSearchCriteria,
  IAssetResponseFormat,
  IAssetSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new asset.
 * @param store
 * @param request
 */
export function createAsset(
  store: Store<SiteWhereUiSettings>,
  request: IAssetCreateRequest
): Promise<AxiosResponse<IAsset>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAsset> = SiteWhere.API.Assets.createAsset(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get asset by token.
 * @param store
 * @param token
 * @param format
 */
export function getAsset(
  store: Store<SiteWhereUiSettings>,
  token: string,
  format: IAssetResponseFormat
): Promise<AxiosResponse<IAsset>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAsset> = SiteWhere.API.Assets.getAsset(
    axios,
    token,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing asset.
 * @param store
 * @param token
 * @param request
 */
export function updateAsset(
  store: Store<SiteWhereUiSettings>,
  token: string,
  request: IAssetCreateRequest
): Promise<AxiosResponse<IAsset>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAsset> = SiteWhere.API.Assets.updateAsset(
    axios,
    token,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * List assets that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listAssets(
  store: Store<SiteWhereUiSettings>,
  criteria: IAssetSearchCriteria,
  format: IAssetResponseFormat
): Promise<AxiosResponse<IAssetSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAssetSearchResults> = SiteWhere.API.Assets.listAssets(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing asset.
 * @param store
 * @param token
 */
export function deleteAsset(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IAsset>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IAsset> = SiteWhere.API.Assets.deleteAsset(
    axios,
    token
  );
  return loaderWrapper(store, api);
}
