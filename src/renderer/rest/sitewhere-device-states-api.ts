import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceStateSearchCriteria,
  IDeviceStateResponseFormat,
  IDeviceStateSearchResults
} from "sitewhere-rest-api";

/**
 * Search device states.
 * @param store
 * @param criteria
 * @param format
 */
export function searchDeviceStates(
  store: Store<SiteWhereUiSettings>,
  criteria: IDeviceStateSearchCriteria,
  format: IDeviceStateResponseFormat
): Promise<AxiosResponse<IDeviceStateSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceStateSearchResults
  > = SiteWhere.API.DeviceStates.searchDeviceStates(axios, criteria, format);
  return loaderWrapper(store, api);
}
