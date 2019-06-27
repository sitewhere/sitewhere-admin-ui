import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IScriptTemplate,
  IScriptMetadata,
  IScriptCreateRequest,
  IScriptVersion,
  IScriptCloneRequest
} from "sitewhere-rest-api";

/**
 * List script templates for a given microservice.
 * @param store
 * @param identifier
 */
export function listScriptTemplates(
  store: Store<SiteWhereUiSettings>,
  identifier: string
): Promise<AxiosResponse<IScriptTemplate[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IScriptTemplate[]
  > = SiteWhere.API.Scripting.listScriptTemplates(axios, identifier);
  return loaderWrapper(store, api);
}

/**
 * Get content for a script template.
 * @param store
 * @param identifier
 * @param templateId
 */
export function getScriptTemplateContent(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  templateId: string
): Promise<AxiosResponse<string>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    string
  > = SiteWhere.API.Scripting.getScriptTemplateContent(
    axios,
    identifier,
    templateId
  );
  return loaderWrapper(store, api);
}

/**
 * List script metadata for a global microservice.
 * @param store
 * @param identifier
 */
export function listGlobalScriptMetadata(
  store: Store<SiteWhereUiSettings>,
  identifier: string
): Promise<AxiosResponse<IScriptMetadata[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IScriptMetadata[]
  > = SiteWhere.API.Scripting.listGlobalScriptMetadata(axios, identifier);
  return loaderWrapper(store, api);
}

/**
 * Get metadata for a global microservice script.
 * @param store
 * @param identifier
 * @param scriptId
 */
export function getGlobalScriptMetadata(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  scriptId: string
): Promise<AxiosResponse<IScriptMetadata>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IScriptMetadata
  > = SiteWhere.API.Scripting.getGlobalScriptMetadata(
    axios,
    identifier,
    scriptId
  );
  return loaderWrapper(store, api);
}

/**
 * Create script for a global microservice.
 * @param store
 * @param identifier
 * @param request
 */
export function createGlobalScript(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  request: IScriptCreateRequest
): Promise<AxiosResponse<IScriptMetadata>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IScriptMetadata
  > = SiteWhere.API.Scripting.createGlobalScript(axios, identifier, request);
  return loaderWrapper(store, api);
}

/**
 * Get content for a global microservice script.
 * @param store
 * @param identifier
 * @param scriptId
 * @param versionId
 */
export function getGlobalScriptContent(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  scriptId: string,
  versionId: string
): Promise<AxiosResponse<string>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    string
  > = SiteWhere.API.Scripting.getGlobalScriptContent(
    axios,
    identifier,
    scriptId,
    versionId
  );
  return loaderWrapper(store, api);
}

/**
 * Update content for a global microservice script.
 * @param store
 * @param identifier
 * @param scriptId
 * @param versionId
 * @param request
 */
export function updateGlobalScript(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  scriptId: string,
  versionId: string,
  request: IScriptCreateRequest
): Promise<AxiosResponse<IScriptMetadata>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IScriptMetadata
  > = SiteWhere.API.Scripting.updateGlobalScript(
    axios,
    identifier,
    scriptId,
    versionId,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Create a clone of a global microservice script.
 * @param store
 * @param identifier
 * @param scriptId
 * @param versionId
 * @param request
 */
export function cloneGlobalScript(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  scriptId: string,
  versionId: string,
  request: IScriptCloneRequest
): Promise<AxiosResponse<IScriptVersion>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IScriptVersion
  > = SiteWhere.API.Scripting.cloneGlobalScript(
    axios,
    identifier,
    scriptId,
    versionId,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Activiate a global microservice script.
 * @param store
 * @param identifier
 * @param scriptId
 * @param versionId
 */
export function activateGlobalScript(
  store: Store<SiteWhereUiSettings>,
  identifier: string,
  scriptId: string,
  versionId: string
): Promise<AxiosResponse<IScriptMetadata>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IScriptMetadata
  > = SiteWhere.API.Scripting.activateGlobalScript(
    axios,
    identifier,
    scriptId,
    versionId
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
  let api: AxiosPromise<
    IScriptMetadata[]
  > = SiteWhere.API.Scripting.listTenantScriptMetadata(
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
  let api: AxiosPromise<
    IScriptMetadata
  > = SiteWhere.API.Scripting.getTenantScriptMetadata(
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
  let api: AxiosPromise<
    IScriptMetadata
  > = SiteWhere.API.Scripting.createTenantScript(
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
  let api: AxiosPromise<
    string
  > = SiteWhere.API.Scripting.getTenantScriptContent(
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
  let api: AxiosPromise<
    IScriptMetadata
  > = SiteWhere.API.Scripting.updateTenantScript(
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
  let api: AxiosPromise<
    IScriptVersion
  > = SiteWhere.API.Scripting.cloneTenantScript(
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
  let api: AxiosPromise<
    IScriptMetadata
  > = SiteWhere.API.Scripting.activateTenantScript(
    axios,
    identifier,
    tenantToken,
    scriptId,
    versionId
  );
  return loaderWrapper(store, api);
}
