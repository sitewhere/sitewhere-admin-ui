import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IDeviceStateSearchCriteria,
  IDeviceStateResponseFormat,
  IDeviceState
} from "sitewhere-rest-api/dist/model/device-states-model";

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
): Promise<AxiosResponse<IDeviceState[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IDeviceState[]
  > = SiteWhere.API.DeviceStates.searchDeviceStates(axios, criteria, format);
  return loaderWrapper(store, api);
}
