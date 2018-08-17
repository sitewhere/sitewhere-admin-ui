import * as rest from 'sitewhere2-rest-api'

/**
 * Create core API URL based on hostname/port settings.
 */
export function createCoreApiUrl (store) {
  return store.getters.protocol + '://' + store.getters.server + ':' +
    store.getters.port + '/sitewhere/api/'
}

/**
 * Create authentication API URL based on hostname/port settings.
 */
export function createAuthApiUrl (store) {
  return store.getters.protocol + '://' + store.getters.server + ':' +
    store.getters.port + '/sitewhere/authapi/'
}

/**
 * Create websocket URL based on hostname/port settings.
 */
export function createAdminWebSocketUrl (store) {
  return store.getters.protocol + '://' + store.getters.server + ':' +
    store.getters.port + '/sitewhere/ws/admin/'
}

/**
 * Create JWT authenticated axios client based on store values.
 */
export function createCoreApiCall (store) {
  var baseUrl = createCoreApiUrl(store)
  var jwt = store.getters.jwt
  var tenantId = (store.getters.selectedTenant) ? store.getters.selectedTenant.token : ''
  var tenantAuth = (store.getters.selectedTenant) ? store.getters.selectedTenant.authenticationToken : ''
  return rest.createAxiosJwt(baseUrl, jwt, tenantId, tenantAuth)
}

/**
 * Create basic auth axios client for getting JWT based on store values.
 */
export function createAuthApiCall (store) {
  var baseUrl = createAuthApiUrl(store)
  var authToken = store.getters.authToken
  return rest.createAxiosBasicAuth(baseUrl, authToken)
}

/**
 * Wrap API call to indicate loading status.
 */
function loaderWrapper (store, apiCall) {
  return new Promise((resolve, reject) => {
    store.commit('startLoading')
    apiCall.then(function (response) {
      store.commit('stopLoading')
      store.commit('error', null)
      resolve(response)
    }).catch(function (e) {
      store.commit('stopLoading')
      store.commit('error', e)
      reject(e)
    })
  })
}

/**
 * Perform and authenticated get for an image.
 */
export function _imageAuthGet (store, imageUrl) {
  let axios = createCoreApiCall(store)
  let api = axios.get(imageUrl, { responseType: 'blob' })
  return loaderWrapper(store, api)
}

/**
 * Get JWT based on credentials.
 */
export function _getJwt (store) {
  let axios = createAuthApiCall(store)
  let api = rest.getJwt(axios)
  return loaderWrapper(store, api)
}

/**
 * Get all microservices in instance topology.
 */
export function _getTopology (store) {
  let axios = createCoreApiCall(store)
  let api = rest.getTopology(axios)
  return loaderWrapper(store, api)
}

/**
 * Get global microservices in instance topology.
 */
export function _getGlobalTopology (store) {
  let axios = createCoreApiCall(store)
  let api = rest.getGlobalTopology(axios)
  return loaderWrapper(store, api)
}

/**
 * Get tenant microservices in instance topology.
 */
export function _getTenantTopology (store) {
  let axios = createCoreApiCall(store)
  let api = rest.getTenantTopology(axios)
  return loaderWrapper(store, api)
}

/**
 * Get the state of all tenant engines (across all microservice instances)
 * for a given tenant id.
 */
export function _getMicroserviceTenantRuntimeState (store, identifier, tenantId) {
  let axios = createCoreApiCall(store)
  let api = rest.getMicroserviceTenantRuntimeState(axios, identifier, tenantId)
  return loaderWrapper(store, api)
}

/**
 * Get configuration model for a microservice based on identifier.
 */
export function _getConfigurationModel (store, identifier) {
  let axios = createCoreApiCall(store)
  let api = rest.getConfigurationModel(axios, identifier)
  return loaderWrapper(store, api)
}

/**
 * Get global microservice configuration based on identifier.
 */
export function _getGlobalConfiguration (store, identifier) {
  let axios = createCoreApiCall(store)
  let api = rest.getGlobalConfiguration(axios, identifier)
  return loaderWrapper(store, api)
}

/**
 * Update global microservice configuration based on identifier.
 */
export function _updateGlobalConfiguration (store, identifier, content) {
  let axios = createCoreApiCall(store)
  let api = rest.updateGlobalConfiguration(axios, identifier, content)
  return loaderWrapper(store, api)
}

/**
 * Get tenant microservice configuration based on identifier.
 */
export function _getTenantConfiguration (store, tenantId, identifier) {
  let axios = createCoreApiCall(store)
  let api = rest.getTenantConfiguration(axios, tenantId, identifier)
  return loaderWrapper(store, api)
}

/**
 * Update tenant microservice configuration based on identifier.
 */
export function _updateTenantConfiguration (store, tenantId, identifier, content) {
  let axios = createCoreApiCall(store)
  let api = rest.updateTenantConfiguration(axios, tenantId, identifier, content)
  return loaderWrapper(store, api)
}

/**
 * List script templates for a given microservice.
 */
export function _listScriptTemplates (store, identifier) {
  let axios = createCoreApiCall(store)
  let api = rest.listScriptTemplates(axios, identifier)
  return loaderWrapper(store, api)
}

/**
 * Get content for a given script template.
 */
export function _getScriptTemplateContent (store, identifier, templateId) {
  let axios = createCoreApiCall(store)
  let api = rest.getScriptTemplateContent(axios, identifier, templateId)
  return loaderWrapper(store, api)
}

/**
 * Get a list of script metadata for the given microservice.
 */
export function _listGlobalScriptMetadata (store, identifier) {
  let axios = createCoreApiCall(store)
  let api = rest.listGlobalScriptMetadata(axios, identifier)
  return loaderWrapper(store, api)
}

/**
 * Get metadata for a specific global script.
 */
export function _getGlobalScriptMetadata (store, identifier, scriptId) {
  let axios = createCoreApiCall(store)
  let api = rest.getGlobalScriptMetadata(axios, identifier, scriptId)
  return loaderWrapper(store, api)
}

/**
 * Create a new global script for a microservice.
 */
export function _createGlobalScript (store, identifier, request) {
  let axios = createCoreApiCall(store)
  let api = rest.createGlobalScript(axios, identifier, request)
  return loaderWrapper(store, api)
}

/**
 * Get content for a global script.
 */
export function _getGlobalScriptContent (store, identifier, scriptId, versionId) {
  let axios = createCoreApiCall(store)
  let api = rest.getGlobalScriptContent(axios, identifier, scriptId, versionId)
  return loaderWrapper(store, api)
}

/**
 * Update metadata/content for a global script.
 */
export function _updateGlobalScript (store, identifier, scriptId, versionId) {
  let axios = createCoreApiCall(store)
  let api = rest.updateGlobalScript(axios, identifier, scriptId, versionId)
  return loaderWrapper(store, api)
}

/**
 * Clone a given version of a global script into a new version.
 */
export function _cloneGlobalScript (store, identifier, scriptId, versionId, request) {
  let axios = createCoreApiCall(store)
  let api = rest.cloneGlobalScript(axios, identifier, scriptId, versionId, request)
  return loaderWrapper(store, api)
}

/**
 * Activate a given version of a global script.
 */
export function _activateGlobalScript (store, identifier, scriptId, versionId) {
  let axios = createCoreApiCall(store)
  let api = rest.activateGlobalScript(axios, identifier, scriptId, versionId)
  return loaderWrapper(store, api)
}

/**
 * Get a list of script metadata for the given tenant.
 */
export function _listTenantScriptMetadata (store, identifier, tenantToken) {
  let axios = createCoreApiCall(store)
  let api = rest.listTenantScriptMetadata(axios, identifier, tenantToken)
  return loaderWrapper(store, api)
}

/**
 * Get metadata for a tenant script based on unique script id.
 */
export function _getTenantScriptMetadata (store, identifier, tenantToken, scriptId) {
  let axios = createCoreApiCall(store)
  let api = rest.getTenantScriptMetadata(axios, identifier, tenantToken, scriptId)
  return loaderWrapper(store, api)
}

/**
 * Create a new tenant script.
 */
export function _createTenantScript (store, identifier, tenantToken, request) {
  let axios = createCoreApiCall(store)
  let api = rest.createTenantScript(axios, identifier, tenantToken, request)
  return loaderWrapper(store, api)
}

/**
 * Get tenant script content based on unique script id and version identifier.
 */
export function _getTenantScriptContent (store, identifier, tenantToken, scriptId, versionId) {
  let axios = createCoreApiCall(store)
  let api = rest.getTenantScriptContent(axios, identifier, tenantToken, scriptId, versionId)
  return loaderWrapper(store, api)
}

/**
 * Update an existing tenant script.
 */
export function _updateTenantScript (store, identifier, tenantToken, scriptId, versionId, request) {
  let axios = createCoreApiCall(store)
  let api = rest.updateTenantScript(axios, identifier, tenantToken, scriptId, versionId, request)
  return loaderWrapper(store, api)
}

/**
 * Clone an existing tenant script version to create a new version.
 */
export function _cloneTenantScript (store, identifier, tenantToken, scriptId, versionId, request) {
  let axios = createCoreApiCall(store)
  let api = rest.cloneTenantScript(axios, identifier, tenantToken, scriptId, versionId, request)
  return loaderWrapper(store, api)
}

/**
 * Activate a tenant script.
 */
export function _activateTenantScript (store, identifier, tenantToken, scriptId, versionId) {
  let axios = createCoreApiCall(store)
  let api = rest.activateTenantScript(axios, identifier, tenantToken, scriptId, versionId)
  return loaderWrapper(store, api)
}

/**
 * Create a user.
 */
export function _createUser (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createUser(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Get user by username.
 */
export function _getUser (store, username) {
  let axios = createCoreApiCall(store)
  var api = rest.getUser(axios, username)
  return loaderWrapper(store, api)
}

/**
 * Update a user.
 */
export function _updateUser (store, username, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateUser(axios, username, payload)
  return loaderWrapper(store, api)
}

/**
 * Delete a user.
 */
export function _deleteUser (store, username, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteUser(axios, username, force)
  return loaderWrapper(store, api)
}

/**
 * List users.
 */
export function _listUsers (store, includeDeleted, count) {
  let axios = createCoreApiCall(store)
  let api = rest.listUsers(axios, includeDeleted, count)
  return loaderWrapper(store, api)
}

/**
 * List authorized tenants for currently logged in user.
 */
export function _listTenantsForCurrentUser (store) {
  let axios = createCoreApiCall(store)
  let username = store.getters.user.username
  var api = rest.listUserTenants(axios, username, false)
  return loaderWrapper(store, api)
}

/**
 * Get hierarchical list of granted authorities.
 */
export function _getAuthoritiesHierarchy (store) {
  let axios = createCoreApiCall(store)
  let api = rest.getAuthoritiesHierarchy(axios)
  return loaderWrapper(store, api)
}

/**
 * Create a tenant.
 */
export function _createTenant (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createTenant(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Get a tenant by tenant id.
 */
export function _getTenant (store, tenantId, includeRuntimeInfo) {
  let axios = createCoreApiCall(store)
  let api = rest.getTenant(axios, tenantId, includeRuntimeInfo)
  return loaderWrapper(store, api)
}

/**
 * Update an existing tenant.
 */
export function _updateTenant (store, tenantId, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateTenant(axios, tenantId, payload)
  return loaderWrapper(store, api)
}

/**
 * List tenants.
 */
export function _listTenants (store, textSearch, authUserId, includeRuntime,
  paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listTenants(axios, textSearch, authUserId, includeRuntime,
    paging)
  return loaderWrapper(store, api)
}

/**
 * Delete a tenant.
 */
export function _deleteTenant (store, tenantId, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteTenant(axios, tenantId, force)
  return loaderWrapper(store, api)
}

/**
 * Get list of tenant templates.
 */
export function _getTenantTemplates (store) {
  let axios = createCoreApiCall(store)
  let api = rest.getTenantTemplates(axios)
  return loaderWrapper(store, api)
}

/**
 * Get list of dataset templates.
 */
export function _getDatasetTemplates (store) {
  let axios = createCoreApiCall(store)
  let api = rest.getDatasetTemplates(axios)
  return loaderWrapper(store, api)
}

/**
 * Create a customer type.
 */
export function _createCustomerType (store, customerType) {
  let axios = createCoreApiCall(store)
  let api = rest.createCustomerType(axios, customerType)
  return loaderWrapper(store, api)
}

/**
 * Get a customer type by unique token.
 */
export function _getCustomerType (store, customerTypeToken) {
  let axios = createCoreApiCall(store)
  let api = rest.getCustomerType(axios, customerTypeToken)
  return loaderWrapper(store, api)
}

/**
 * Update an existing customer type.
 */
export function _updateCustomerType (store, customerTypeToken, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateCustomerType(axios, customerTypeToken, payload)
  return loaderWrapper(store, api)
}

/**
 * List customer types.
 */
export function _listCustomerTypes (store, includeContainedCustomerTypes,
  paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listCustomerTypes(axios, includeContainedCustomerTypes, paging)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing customer type.
 */
export function _deleteCustomerType (store, customerTypeToken, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteCustomerType(axios, customerTypeToken, force)
  return loaderWrapper(store, api)
}

/**
 * Create a customer.
 */
export function _createCustomer (store, customer) {
  let axios = createCoreApiCall(store)
  let api = rest.createCustomer(axios, customer)
  return loaderWrapper(store, api)
}

/**
 * Get a customer by unique token.
 */
export function _getCustomer (store, customerToken) {
  let axios = createCoreApiCall(store)
  let api = rest.getCustomer(axios, customerToken)
  return loaderWrapper(store, api)
}

/**
 * Update an existing customer.
 */
export function _updateCustomer (store, customerToken, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateCustomer(axios, customerToken, payload)
  return loaderWrapper(store, api)
}

/**
 * List customers.
 */
export function _listCustomers (store, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listCustomers(axios, options, paging)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing customer.
 */
export function _deleteCustomer (store, customerToken, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteCustomer(axios, customerToken, force)
  return loaderWrapper(store, api)
}

/**
 * List assignments for a given customer.
 */
export function _listAssignmentsForCustomer (store, customerToken, options,
  paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listAssignmentsForCustomer(axios, customerToken, options,
    paging)
  return loaderWrapper(store, api)
}

/**
 * List location events for a given customer.
 */
export function _listLocationsForCustomer (store, customerToken, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listLocationsForCustomer(axios, customerToken, paging)
  return loaderWrapper(store, api)
}

/**
 * List measurement events for a given customer.
 */
export function _listMeasurementsForCustomer (store, customerToken, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listMeasurementsForCustomer(axios, customerToken, paging)
  return loaderWrapper(store, api)
}

/**
 * List alert events for a given customer.
 */
export function _listAlertsForCustomer (store, customerToken, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listAlertsForCustomer(axios, customerToken, paging)
  return loaderWrapper(store, api)
}

/**
 * Create an area type.
 */
export function _createAreaType (store, areaType) {
  let axios = createCoreApiCall(store)
  let api = rest.createAreaType(axios, areaType)
  return loaderWrapper(store, api)
}

/**
 * Get an area type by unique token.
 */
export function _getAreaType (store, areaTypeToken) {
  let axios = createCoreApiCall(store)
  let api = rest.getAreaType(axios, areaTypeToken)
  return loaderWrapper(store, api)
}

/**
 * Update an existing area type.
 */
export function _updateAreaType (store, areaTypeToken, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateAreaType(axios, areaTypeToken, payload)
  return loaderWrapper(store, api)
}

/**
 * List area types.
 */
export function _listAreaTypes (store, includeContainedAreaTypes, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listAreaTypes(axios, includeContainedAreaTypes, paging)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing area type.
 */
export function _deleteAreaType (store, areaTypeToken, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteAreaType(axios, areaTypeToken, force)
  return loaderWrapper(store, api)
}

/**
 * Create an area.
 */
export function _createArea (store, area) {
  let axios = createCoreApiCall(store)
  let api = rest.createArea(axios, area)
  return loaderWrapper(store, api)
}

/**
 * Get an area by unique token.
 */
export function _getArea (store, areaToken) {
  let axios = createCoreApiCall(store)
  let api = rest.getArea(axios, areaToken)
  return loaderWrapper(store, api)
}

/**
 * Update an existing area.
 */
export function _updateArea (store, areaToken, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateArea(axios, areaToken, payload)
  return loaderWrapper(store, api)
}

/**
 * List areas.
 */
export function _listAreas (store, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listAreas(axios, options, paging)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing area.
 */
export function _deleteArea (store, areaToken, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteArea(axios, areaToken, force)
  return loaderWrapper(store, api)
}

/**
 * List assignments for a given area.
 */
export function _listAssignmentsForArea (store, areaToken, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listAssignmentsForArea(axios, areaToken, options, paging)
  return loaderWrapper(store, api)
}

/**
 * List location events for a given area.
 */
export function _listLocationsForArea (store, areaToken, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listLocationsForArea(axios, areaToken, paging)
  return loaderWrapper(store, api)
}

/**
 * List measurement events for a given area.
 */
export function _listMeasurementsForArea (store, areaToken, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listMeasurementsForArea(axios, areaToken, paging)
  return loaderWrapper(store, api)
}

/**
 * List alert events for a given area.
 */
export function _listAlertsForArea (store, areaToken, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listAlertsForArea(axios, areaToken, paging)
  return loaderWrapper(store, api)
}

/**
 * List zones matching criteria.
 */
export function _listZones (store, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listZones(axios, options, paging)
  return loaderWrapper(store, api)
}

/**
 * Create a zone.
 */
export function _createZone (store, zone) {
  let axios = createCoreApiCall(store)
  let api = rest.createZone(axios, zone)
  return loaderWrapper(store, api)
}

/**
 * Get a zone by unique token.
 */
export function _getZone (store, zoneToken) {
  let axios = createCoreApiCall(store)
  let api = rest.getZone(axios, zoneToken)
  return loaderWrapper(store, api)
}

/**
 * Update an existing zone.
 */
export function _updateZone (store, zoneToken, updated) {
  let axios = createCoreApiCall(store)
  let api = rest.updateZone(axios, zoneToken, updated)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing zone.
 */
export function _deleteZone (store, zoneToken) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteZone(axios, zoneToken)
  return loaderWrapper(store, api)
}

/**
 * Create a device assignment.
 */
export function _createDeviceAssignment (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createDeviceAssignment(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Get a device assignment by unique token.
 */
export function _getDeviceAssignment (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.getDeviceAssignment(axios, token)
  return loaderWrapper(store, api)
}

/**
 * List device assignments that match criteria.
 */
export function _listDeviceAssignments (store, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listDeviceAssignments(axios, options, paging)
  return loaderWrapper(store, api)
}

/**
 * Delete a device assignment.
 */
export function _deleteDeviceAssignment (store, token, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteDeviceAssignment(axios, token, force)
  return loaderWrapper(store, api)
}

/**
 * Create measurements event for a device assignment.
 */
export function _createMeasurementsForAssignment (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createMeasurementsForAssignment(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * List measurement events for a device assignment.
 */
export function _listMeasurementsForAssignment (store, token, query) {
  let axios = createCoreApiCall(store)
  let api = rest.listMeasurementsForAssignment(axios, token, query)
  return loaderWrapper(store, api)
}

/**
 * List measurement events for a device assignment.
 */
export function _listMeasurementsForAssignmentAsChartSeries (store, token,
  mxIds, query) {
  let axios = createCoreApiCall(store)
  let api = rest.listMeasurementsForAssignmentAsChartSeries(axios, token,
    mxIds, query)
  return loaderWrapper(store, api)
}

/**
 * Create location event for a device assignment.
 */
export function _createLocationForAssignment (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createLocationForAssignment(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * List location events for a device assignment.
 */
export function _listLocationsForAssignment (store, token, query) {
  let axios = createCoreApiCall(store)
  let api = rest.listLocationsForAssignment(axios, token, query)
  return loaderWrapper(store, api)
}

/**
 * Create alert event for a device assignment.
 */
export function _createAlertForAssignment (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createAlertForAssignment(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * List alert events for a device assignment.
 */
export function _listAlertsForAssignment (store, token, query) {
  let axios = createCoreApiCall(store)
  let api = rest.listAlertsForAssignment(axios, token, query)
  return loaderWrapper(store, api)
}

/**
 * Create command invocation for a device assignment.
 */
export function _createCommandInvocationForAssignment (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createCommandInvocationForAssignment(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * Schedule command invocation for a device assignment.
 */
export function _scheduleCommandInvocation (store, token, schedule, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.scheduleCommandInvocation(axios, token, schedule, payload)
  return loaderWrapper(store, api)
}

/**
 * List command invocation events for a device assignment.
 */
export function _listCommandInvocationsForAssignment (store, token, query) {
  let axios = createCoreApiCall(store)
  let api = rest.listCommandInvocationsForAssignment(axios, token, query)
  return loaderWrapper(store, api)
}

/**
 * List command response events for a device assignment.
 */
export function _listCommandResponsesForAssignment (store, token, query) {
  let axios = createCoreApiCall(store)
  let api = rest.listCommandResponsesForAssignment(axios, token, query)
  return loaderWrapper(store, api)
}

/**
 * Release an assignment.
 */
export function _releaseAssignment (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.releaseAssignment(axios, token)
  return loaderWrapper(store, api)
}

/**
 * Report an assignment as missing.
 */
export function _missingAssignment (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.missingAssignment(axios, token)
  return loaderWrapper(store, api)
}

/**
 * Create a new device type.
 */
export function _createDeviceType (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createDeviceType(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Get a device type by token.
 */
export function _getDeviceType (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.getDeviceType(axios, token)
  return loaderWrapper(store, api)
}

/**
 * Get a device type protocol buffer definition.
 */
export function _getDeviceTypeProtobuf (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.getDeviceTypeProtobuf(axios, token)
  return loaderWrapper(store, api)
}

/**
 * Update an existing device type.
 */
export function _updateDeviceType (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateDeviceType(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * List device types.
 */
export function _listDeviceTypes (store, includeDeleted, includeAsset, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listDeviceTypes(axios, includeDeleted, includeAsset, paging)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing device type.
 */
export function _deleteDeviceType (store, token, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteDeviceType(axios, token, force)
  return loaderWrapper(store, api)
}

/**
 * Create a device command.
 */
export function _createDeviceCommand (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createDeviceCommand(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * Get a device command by token.
 */
export function _getDeviceCommand (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.getDeviceCommand(axios, token)
  return loaderWrapper(store, api)
}

/**
 * Update an exiting device command.
 */
export function _updateDeviceCommand (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateDeviceCommand(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * List commands for a device type.
 */
export function _listDeviceCommands (store, token, options) {
  let axios = createCoreApiCall(store)
  let api = rest.listDeviceCommands(axios, token, options)
  return loaderWrapper(store, api)
}

/**
 * List device specification commands organized by namespace.
 */
export function _listDeviceCommandsByNamespace (store, token, includeDeleted) {
  let axios = createCoreApiCall(store)
  let api = rest.listDeviceCommandsByNamespace(axios, token, includeDeleted)
  return loaderWrapper(store, api)
}

/**
 * Delete a device command.
 */
export function _deleteDeviceCommand (store, token, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteDeviceCommand(axios, token, force)
  return loaderWrapper(store, api)
}

/**
 * Create a device status.
 */
export function _createDeviceStatus (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createDeviceStatus(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * Get a device status by code.
 */
export function _getDeviceStatus (store, token, code) {
  let axios = createCoreApiCall(store)
  let api = rest.getDeviceStatus(axios, token, code)
  return loaderWrapper(store, api)
}

/**
 * Update an existing device status.
 */
export function _updateDeviceStatus (store, token, code, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateDeviceStatus(axios, token, code, payload)
  return loaderWrapper(store, api)
}

/**
 * List statuses for a device specification.
 */
export function _listDeviceStatuses (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.listDeviceStatuses(axios, token)
  return loaderWrapper(store, api)
}

/**
 * Delete a device status.
 */
export function _deleteDeviceStatus (store, token, code) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteDeviceStatus(axios, token, code)
  return loaderWrapper(store, api)
}

/**
 * Create a device.
 */
export function _createDevice (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createDevice(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Update an existing device.
 */
export function _updateDevice (store, hardwareId, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateDevice(axios, hardwareId, payload)
  return loaderWrapper(store, api)
}

/**
 * List devices.
 */
export function _listDevices (store, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listDevices(axios, options, paging)
  return loaderWrapper(store, api)
}

/**
 * List assignment history for a device.
 */
export function _listDeviceAssignmentHistory (store, token, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listDeviceAssignmentHistory(axios, token, options, paging)
  return loaderWrapper(store, api)
}

/**
 * Get a device by token.
 */
export function _getDevice (store, token, options) {
  let axios = createCoreApiCall(store)
  let api = rest.getDevice(axios, token, options)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing device.
 */
export function _deleteDevice (store, token, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteDevice(axios, token, force)
  return loaderWrapper(store, api)
}

/**
 * Create a device group.
 */
export function _createDeviceGroup (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createDeviceGroup(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Update an existing device group.
 */
export function _updateDeviceGroup (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateDeviceGroup(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * Get a device group by token.
 */
export function _getDeviceGroup (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.getDeviceGroup(axios, token)
  return loaderWrapper(store, api)
}

/**
 * List device groups.
 */
export function _listDeviceGroups (store, role, includeDeleted, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listDeviceGroups(axios, role, includeDeleted, paging)
  return loaderWrapper(store, api)
}

/**
 * List device group elements.
 */
export function _listDeviceGroupElements (store, token, includeDetails, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listDeviceGroupElements(axios, token, includeDetails, paging)
  return loaderWrapper(store, api)
}

/**
 * Add a device group element.
 */
export function _addDeviceGroupElement (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.addDeviceGroupElement(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * Delete a device group element.
 */
export function _deleteDeviceGroupElement (store, token, elementId) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteDeviceGroupElement(axios, token, elementId)
  return loaderWrapper(store, api)
}

/**
 * Delete a device group.
 */
export function _deleteDeviceGroup (store, token, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteDeviceGroup(axios, token, force)
  return loaderWrapper(store, api)
}

/**
 * Search device states.
 */
export function _searchDeviceStates (store, criteria, options) {
  let axios = createCoreApiCall(store)
  let api = rest.searchDeviceStates(axios, criteria, options)
  return loaderWrapper(store, api)
}

/**
 * Create an asset type.
 */
export function _createAssetType (store, assetType) {
  let axios = createCoreApiCall(store)
  let api = rest.createAssetType(axios, assetType)
  return loaderWrapper(store, api)
}

/**
 * Get an asset type by unique token.
 */
export function _getAssetType (store, assetTypeToken) {
  let axios = createCoreApiCall(store)
  let api = rest.getAssetType(axios, assetTypeToken)
  return loaderWrapper(store, api)
}

/**
 * Update an existing asset type.
 */
export function _updateAssetType (store, assetTypeToken, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateAssetType(axios, assetTypeToken, payload)
  return loaderWrapper(store, api)
}

/**
 * List asset types.
 */
export function _listAssetTypes (store, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listAssetTypes(axios, options, paging)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing asset type.
 */
export function _deleteAssetType (store, assetTypeToken, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteAssetType(axios, assetTypeToken, force)
  return loaderWrapper(store, api)
}

/**
 * Create an asset.
 */
export function _createAsset (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createAsset(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Get an asset by unique token.
 */
export function _getAsset (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.getAsset(axios, token)
  return loaderWrapper(store, api)
}

/**
 * Update an existing asset.
 */
export function _updateAsset (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateAsset(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * List assets.
 */
export function _listAssets (store, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listAssets(axios, options, paging)
  return loaderWrapper(store, api)
}

/**
 * Delete an existing asset.
 */
export function _deleteAsset (store, token, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteAsset(axios, token, force)
  return loaderWrapper(store, api)
}

/**
 * Get batch operation by token.
 */
export function _getBatchOperation (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.getBatchOperation(axios, token)
  return loaderWrapper(store, api)
}

/**
 * List batch operations.
 */
export function _listBatchOperations (store, token, includeDeleted,
  paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listBatchOperations(axios, token, includeDeleted, paging)
  return loaderWrapper(store, api)
}

/**
 * List batch operation elements.
 */
export function _listBatchOperationElements (store, token, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listBatchOperationElements(axios, token, options, paging)
  return loaderWrapper(store, api)
}

/**
 * Create a batch command invocation.
 */
export function _createBatchCommandInvocation (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createBatchCommandInvocation(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Create a batch command invocation based on criteria.
 */
export function _createBatchCommandByCriteria (store, options, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createBatchCommandByCriteria(axios, options, payload)
  return loaderWrapper(store, api)
}

/**
 * Create a schedule.
 */
export function _createSchedule (store, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.createSchedule(axios, payload)
  return loaderWrapper(store, api)
}

/**
 * Get a schedule by unique token.
 */
export function _getSchedule (store, token) {
  let axios = createCoreApiCall(store)
  let api = rest.getSchedule(axios, token)
  return loaderWrapper(store, api)
}

/**
 * Update an existing schedule.
 */
export function _updateSchedule (store, token, payload) {
  let axios = createCoreApiCall(store)
  let api = rest.updateSchedule(axios, token, payload)
  return loaderWrapper(store, api)
}

/**
 * Delete a schedule.
 */
export function _deleteSchedule (store, token, force) {
  let axios = createCoreApiCall(store)
  let api = rest.deleteSchedule(axios, token, token, force)
  return loaderWrapper(store, api)
}

/**
 * List schedules.
 */
export function _listSchedules (store, options, paging) {
  let axios = createCoreApiCall(store)
  let api = rest.listSchedules(axios, options, paging)
  return loaderWrapper(store, api)
}
