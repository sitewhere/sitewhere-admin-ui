import * as SiteWhere from "sitewhere-rest-api";
import { AxiosInstance, AxiosPromise, AxiosResponse } from "axios";
import { Store } from "vuex";
import { SiteWhereUiSettings } from "../store";
import { createCoreApiCall, loaderWrapper } from "./sitewhere-api-wrapper";
import {
  IBatchOperation,
  IBatchOperationSearchCriteria,
  IBatchOperationResponseFormat,
  IBatchOperationElementResponseFormat,
  IBatchCommandInvocationRequest,
  IBatchCommandForCriteriaRequest,
  IBatchOperationSearchResults,
  IBatchElementSearchResults,
  ISearchCriteria
} from "sitewhere-rest-api";

/**
 * Get batch operation by token.
 * @param store
 * @param token
 */
export function getBatchOperation(
  store: Store<SiteWhereUiSettings>,
  token: string
): Promise<AxiosResponse<IBatchOperation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperation
  > = SiteWhere.API.BatchOperations.getBatchOperation(axios, token);
  return loaderWrapper(store, api);
}

/**
 * List batch operations that match criteria.
 * @param store
 * @param criteria
 * @param format
 */
export function listBatchOperations(
  store: Store<SiteWhereUiSettings>,
  criteria: IBatchOperationSearchCriteria,
  format: IBatchOperationResponseFormat
): Promise<AxiosResponse<IBatchOperationSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperationSearchResults
  > = SiteWhere.API.BatchOperations.listBatchOperations(
    axios,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * List batch operation elements that match criteria.
 * @param store
 * @param token
 * @param criteria
 * @param format
 */
export function listBatchOperationElements(
  store: Store<SiteWhereUiSettings>,
  token: string,
  criteria: ISearchCriteria,
  format: IBatchOperationElementResponseFormat
): Promise<AxiosResponse<IBatchElementSearchResults>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchElementSearchResults
  > = SiteWhere.API.BatchOperations.listBatchOperationElements(
    axios,
    token,
    criteria,
    format
  );
  return loaderWrapper(store, api);
}

/**
 * Create a batch command invocation.
 * @param store
 * @param request
 */
export function createBatchCommandInvocation(
  store: Store<SiteWhereUiSettings>,
  request: IBatchCommandInvocationRequest
): Promise<AxiosResponse<IBatchOperation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperation
  > = SiteWhere.API.BatchOperations.createBatchCommandInvocation(
    axios,
    request
  );
  return loaderWrapper(store, api);
}

/**
 * Create a batch operation based on criteria.
 * @param store
 * @param request
 */
export function createBatchCommandForCriteria(
  store: Store<SiteWhereUiSettings>,
  request: IBatchCommandForCriteriaRequest
): Promise<AxiosResponse<IBatchOperation>> {
  let axios: AxiosInstance = createCoreApiCall(store);
  let api: AxiosPromise<
    IBatchOperation
  > = SiteWhere.API.BatchOperations.createBatchCommandForCriteria(
    axios,
    request
  );
  return loaderWrapper(store, api);
}
