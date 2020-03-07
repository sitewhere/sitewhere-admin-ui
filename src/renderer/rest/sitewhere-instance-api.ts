import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IMicroserviceSummary,
  ITenantEngineConfiguration,
  IInstanceConfiguration
} from "sitewhere-rest-api";

/**
 * Get currently effective instance configuration.
 * @param store
 */
export function getInstanceConfiguration(
  store: Store<SiteWhereUiSettings>
): Promise<AxiosResponse<IInstanceConfiguration>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IInstanceConfiguration> = SiteWhere.API.Instance.getInstanceConfiguration(
    axios
  );
  return loaderWrapper(store, api);
}

/**
 * Update the global instance configuration.
 * @param store
 * @param request
 */
export function updateInstanceConfiguration(
  store: Store<SiteWhereUiSettings>,
  request: IInstanceConfiguration
): Promise<AxiosResponse<IInstanceConfiguration>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IInstanceConfiguration> = SiteWhere.API.Instance.updateInstanceConfiguration(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get instance topology information.
 * @param store
 */
export function getInstanceMicroservices(
  store: Store<SiteWhereUiSettings>
): Promise<AxiosResponse<IMicroserviceSummary[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IMicroserviceSummary[]> = SiteWhere.API.Instance.getInstanceMicroservices(
    axios
  );
  return loaderWrapper(store, api);
}

/**
 * Get tenant engine configuration information.
 * @param store
 * @param functionalArea
 * @param tenant
 */
export function getTenantEngineConfiguration(
  store: Store<SiteWhereUiSettings>,
  functionalArea: string,
  tenant: string
): Promise<AxiosResponse<ITenantEngineConfiguration>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<ITenantEngineConfiguration> = SiteWhere.API.Instance.getTenantEngineConfiguration(
    axios,
    functionalArea,
    tenant
  );
  return loaderWrapper(store, api);
}
