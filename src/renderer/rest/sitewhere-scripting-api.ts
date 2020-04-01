import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IScriptCategory,
  IScriptTemplate,
  IScriptMetadata,
  IScriptCreateRequest,
  IScriptVersion,
  IScriptCloneRequest
} from "sitewhere-rest-api";

/**
 * List all script categories for a functional area.
 * @param store
 * @param identifier
 */
export function listScriptCategories(
  store: Store<SiteWhereUiSettings>,
  identifier: string
): Promise<AxiosResponse<IScriptCategory[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IScriptCategory[]> = SiteWhere.API.Scripting.listScriptCategories(
    axios,
    identifier
  );
  return loaderWrapper(store, api);
}

/**
 * List script templates for a functional area and in a given category.
 * @param store
 * @param identifier
 * @param category
 */
export function listScriptTemplates(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  category: string
): Promise<AxiosResponse<IScriptTemplate[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IScriptTemplate[]> = SiteWhere.API.Scripting.listScriptTemplates(
    axios,
    identifier,
    category
  );
  return loaderWrapper(store, api);
}

/**
 * List metadata for microservice tenant scripts.
 * @param store
 * @param identifier
 * @param tenantToken
 */
export function listTenantScriptMetadata(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantToken: string
): Promise<AxiosResponse<IScriptMetadata[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IScriptMetadata[]> = SiteWhere.API.Scripting.listTenantScripts(
    axios,
    identifier,
    tenantToken
  );
  return loaderWrapper(store, api);
}

/**
 * Get metadata associated with a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 */
export function getTenantScriptMetadata(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantToken: string,
  scriptId: string
): Promise<AxiosResponse<IScriptMetadata>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IScriptMetadata> = SiteWhere.API.Scripting.getTenantScript(
    axios,
    identifier,
    tenantToken,
    scriptId
  );
  return loaderWrapper(store, api);
}

/**
 * Create a new microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param request
 */
export function createTenantScript(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantToken: string,
  request: IScriptCreateRequest
): Promise<AxiosResponse<IScriptMetadata>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IScriptMetadata> = SiteWhere.API.Scripting.createTenantScript(
    axios,
    identifier,
    tenantToken,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Get content for a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 */
export function getTenantScriptContent(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantToken: string,
  scriptId: string,
  versionId: string
): Promise<AxiosResponse<string>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<string> = SiteWhere.API.Scripting.getTenantScriptContent(
    axios,
    identifier,
    tenantToken,
    scriptId,
    versionId
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 * @param request
 */
export function updateTenantScript(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantToken: string,
  scriptId: string,
  versionId: string,
  request: IScriptCreateRequest
): Promise<AxiosResponse<IScriptMetadata>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IScriptMetadata> = SiteWhere.API.Scripting.updateTenantScript(
    axios,
    identifier,
    tenantToken,
    scriptId,
    versionId,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Clone an existing microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 * @param request
 */
export function cloneTenantScript(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantToken: string,
  scriptId: string,
  versionId: string,
  request: IScriptCloneRequest
): Promise<AxiosResponse<IScriptVersion>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IScriptVersion> = SiteWhere.API.Scripting.cloneTenantScript(
    axios,
    identifier,
    tenantToken,
    scriptId,
    versionId,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Activate a microservice tenant script.
 * @param store
 * @param identifier
 * @param tenantToken
 * @param scriptId
 * @param versionId
 */
export function activateTenantScript(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  tenantToken: string,
  scriptId: string,
  versionId: string
): Promise<AxiosResponse<IScriptMetadata>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IScriptMetadata> = SiteWhere.API.Scripting.activateTenantScript(
    axios,
    identifier,
    tenantToken,
    scriptId,
    versionId
  );
  return loaderWrapper(store, api);
}
