import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IInstanceTopologySummary,
  ITenantEngineState,
  IConfigurationModel,
  IElementContent
} from "sitewhere-rest-api";

/**
 * Get instance topology information.
 * @param store
 */
export function getTopology(
  store: Store<SiteWhereUiSettings>
): Promise<AxiosResponse<IInstanceTopologySummary[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IInstanceTopologySummary[]
  > = SiteWhere.API.Instance.getTopology(axios);
  return loaderWrapper(store, api);
}

/**
 * Get topology information for global microservices.
 * @param store
 */
export function getGlobalTopology(
  store: Store<SiteWhereUiSettings>
): Promise<AxiosResponse<IInstanceTopologySummary[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IInstanceTopologySummary[]
  > = SiteWhere.API.Instance.getGlobalTopology(axios);
  return loaderWrapper(store, api);
}

/**
 * Get topology information for multitenant microservices.
 * @param store
 */
export function getTenantTopology(
  store: Store<SiteWhereUiSettings>
): Promise<AxiosResponse<IInstanceTopologySummary[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IInstanceTopologySummary[]
  > = SiteWhere.API.Instance.getTenantTopology(axios);
  return loaderWrapper(store, api);
}

/**
 * Get runtime state for a microservice tenant.
 * @param store
 * @param identifier
 * @param tenantId
 */
export function getTenantRuntimeState(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantId: string
): Promise<AxiosResponse<ITenantEngineState[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    ITenantEngineState[]
  > = SiteWhere.API.Instance.getTenantRuntimeState(axios, identifier, tenantId);
  return loaderWrapper(store, api);
}

/**
 * Get microservice configuration model.
 * @param store
 * @param identifier
 */
export function getConfigurationModel(
  store: Store<SiteWhereUiSettings>,
  identifier: string
): Promise<AxiosResponse<IConfigurationModel>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IConfigurationModel
  > = SiteWhere.API.Instance.getConfigurationModel(axios, identifier);
  return loaderWrapper(store, api);
}

/**
 * Get configuration content for a global microservice.
 * @param store
 * @param identifier
 */
export function getGlobalConfiguration(
  store: Store<SiteWhereUiSettings>,
  identifier: string
): Promise<AxiosResponse<IElementContent>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IElementContent
  > = SiteWhere.API.Instance.getGlobalConfiguration(axios, identifier);
  return loaderWrapper(store, api);
}

/**
 * Update configuration content for a global microservice.
 * @param store
 * @param identifier
 * @param content
 */
export function updateGlobalConfiguration(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  content: IElementContent
): Promise<AxiosResponse<void>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    void
  > = SiteWhere.API.Instance.updateGlobalConfiguration(
    axios,
    identifier,
    content
  );
  return loaderWrapper(store, api);
}

/**
 * Get microservice tenant configuration content.
 * @param store
 * @param identifier
 * @param tenantId
 */
export function getTenantConfiguration(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantId: string
): Promise<AxiosResponse<IElementContent>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IElementContent
  > = SiteWhere.API.Instance.getTenantConfiguration(
    axios,
    identifier,
    tenantId
  );
  return loaderWrapper(store, api);
}

/**
 * Update microservice tenant configuration content.
 * @param store
 * @param tenantId
 * @param identifier
 * @param content
 */
export function updateTenantConfiguration(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantId: string,
  content: IElementContent
): Promise<AxiosResponse<void>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    void
  > = SiteWhere.API.Instance.updateTenantConfiguration(
    axios,
    identifier,
    tenantId,
    content
  );
  return loaderWrapper(store, api);
}
