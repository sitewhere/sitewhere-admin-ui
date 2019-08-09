import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceCommandSearchCriteria,
  IDeviceCommandResponseFormat,
  IDeviceCommandSearchResults,
  IDeviceCommandNamespaceSearchResults
} from "sitewhere-rest-api";

/**
 * List device commands matching criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceCommands(
  store: Store<SiteWhereUiSettings>,
  criteria: IDeviceCommandSearchCriteria,
  format: IDeviceCommandResponseFormat
): Promise<AxiosResponse<IDeviceCommandSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommandSearchResults
  > = SiteWhere.API.DeviceCommands.listDeviceCommands(axios, criteria, format);
  return loaderWrapper(store, api);
}

/**
 * List device commands matching criteria. Organize results by namespace.
 * @param store
 * @param criteria
 * @param format
 */
export function listDeviceCommandsByNamespace(
  store: Store<SiteWhereUiSettings>,
  criteria: IDeviceCommandSearchCriteria,
  format: IDeviceCommandResponseFormat
): Promise<AxiosResponse<IDeviceCommandNamespaceSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceCommandNamespaceSearchResults
  > = SiteWhere.API.DeviceCommands.listDeviceCommandsForNamespace(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}
