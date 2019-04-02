import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IUser,
  IUserCreateRequest,
  IUserSearchCriteria,
  IUserResponseFormat,
  IGrantedAuthorityHierarchyNode,
  IUserSearchResults
} from "sitewhere-rest-api";

/**
 * Create a new system user.
 * @param store
 * @param payload
 */
export function createUser(
  store: Store<SiteWhereUiSettings>,
  request: IUserCreateRequest
): Promise<AxiosResponse<IUser>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IUser> = SiteWhere.API.Users.createUser(axios, request);
  return loaderWrapper(store, api);
}

/**
 * Get an existing system user by username.
 * @param store
 * @param username
 * @param format
 */
export function getUser(
  store: Store<SiteWhereUiSettings>,
  username: string,
  format: IUserResponseFormat
): Promise<AxiosResponse<IUser>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  var api: AxiosPromise<IUser> = SiteWhere.API.Users.getUser(
    axios,
    username,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Update an existing system user.
 * @param store
 * @param username
 * @param request
 */
export function updateUser(
  store: Store<SiteWhereUiSettings>,
  username: string,
  request: IUserCreateRequest
): Promise<AxiosResponse<IUser>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IUser> = SiteWhere.API.Users.updateUser(
    axios,
    username,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Delete an existing system user.
 * @param store
 * @param username
 */
export function deleteUser(
  store: Store<SiteWhereUiSettings>,
  username: string
): Promise<AxiosResponse<IUser>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IUser> = SiteWhere.API.Users.deleteUser(
    axios,
    username
  );
  return loaderWrapper(store, api);
}

/**
 * List users that match the given criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listUsers(
  store: Store<SiteWhereUiSettings>,
  criteria: IUserSearchCriteria,
  format: IUserResponseFormat
): Promise<AxiosResponse<IUserSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<IUserSearchResults> = SiteWhere.API.Users.listUsers(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Get parent/child hierarchy for granted authorities.
 * @param store
 */
export function getAuthoritiesHierarchy(
  store: Store<SiteWhereUiSettings>
): Promise<AxiosResponse<IGrantedAuthorityHierarchyNode[]>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IGrantedAuthorityHierarchyNode[]
  > = SiteWhere.API.Users.getAuthoritiesHierarchy(axios);
  return loaderWrapper(store, api);
}
