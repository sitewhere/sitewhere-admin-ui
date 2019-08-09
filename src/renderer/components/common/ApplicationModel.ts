/**
 * Message that captures an alert (error or informational)
 */
export interface IAlertMessage {
  message: string;
  type: string;
}

/**
 * Information required to connect to a remote SiteWhere instance.
 */
export interface IRemoteConnection {
  id: string;
  name: string;
  protocol: string;
  host: string;
  port: number;
}

/**
 * Information about known remote SiteWhere instances.
 */
export interface IRemotes {
  connections: IRemoteConnection[];
  default: string;
}
