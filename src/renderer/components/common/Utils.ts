import moment from "moment";

/**
 * Common error handler.
 * @param err
 */
export function handleError(err: Error): void {
  console.log(err);
}

/**
 * Format date in YYYY-MM-DD H:mm:ss format. N/A for null.
 * @param date
 */
export function formatDate(date: Date) {
  if (!date) {
    return "N/A";
  }
  return moment(date).format("YYYY-MM-DD H:mm:ss");
}

/**
 * Format date in YYYY-MM-DD H:mm:ss format.
 * @param date
 */
export function formatIso8601(date: Date) {
  if (!date) {
    return null;
  }
  return moment(date).toISOString();
}

/**
 * Parse date in YYYY-MM-DD H:mm:ss format.
 * @param value
 */
export function parseIso8601(value: string) {
  if (!value) {
    return null;
  }
  return moment(value).toDate();
}

/**
 * Tests whether a string is blank.
 * @param str
 */
export function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}

/**
 * Short string with ellipsis if necessary.
 * @param val
 * @param max
 */
export function ellipsis(val: string, max: number) {
  return val.length > max ? val.substring(0, max) + "..." : val;
}

/**
 * Rounds to four decimal places
 * @param val
 */
export function fourDecimalPlaces(val: number): string {
  return Number(Math.round(parseFloat(val + "e4")) + "e-4").toFixed(4);
}

/**
 * Converts metadata object into array.
 * @param meta
 */
export function metadataToArray(meta: { [id: string]: any }) {
  var flat = [];
  if (meta) {
    for (var key in meta) {
      if (meta.hasOwnProperty(key)) {
        flat.push({ name: key, value: meta[key] });
      }
    }
  }
  return flat;
}

/**
 * Converts array to metadata object.
 * @param arrayMeta
 */
export function arrayToMetadata(arrayMeta: any[]) {
  var metadata: { [id: string]: any } = {};
  if (arrayMeta) {
    for (var i = 0; i < arrayMeta.length; i++) {
      metadata[arrayMeta[i].name] = arrayMeta[i].value;
    }
  }
  return metadata;
}

/**
 * Indicates if logged-in user is authorized for all auths in list.
 * @param component
 * @param list
 */
export function isAuthForAll(component: any, list: string[]): boolean {
  let user = component.$store.getters.user;
  if (!user) {
    console.log("No user for permissions check.");
    return false;
  }
  return list.every(auth => user.authorities.indexOf(auth) > -1);
}

/**
 * Routes to a applicaton-relative URL.
 * @param component
 * @param url
 */
export function routeTo(component: any, url: string): void {
  var tenant = component.$store.getters.selectedTenant;
  if (tenant) {
    component.$router.push("/tenants/" + tenant.token + url);
  }
}

/**
 * Routes to device page for hardware id.
 * @param component
 * @param token
 */
export function routeToDevice(component: any, token: string) {
  routeTo(component, "/devices/" + token);
}

/**
 * Returns paging value for all results.
 */
export function pagingForAllResults() {
  return "page=1&pageSize=0";
}
