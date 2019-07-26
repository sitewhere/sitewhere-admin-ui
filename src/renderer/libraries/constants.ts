import { ITableHeaders, IPageSizes } from "sitewhere-ide-common";
import { ParameterType } from "sitewhere-rest-api";

/**
 * Enumeration of navigation icons.
 */
export enum NavigationIcon {
  Tenant = "layers",
  User = "people",
  Global = "language",
  Device = "developer_board",
  DeviceType = "settings",
  DeviceAssignment = "link",
  DeviceCommand = "call_made",
  DeviceStatus = "warning",
  DeviceGroup = "apps",
  Customer = "account_balance",
  CustomerType = "settings",
  Area = "collections",
  AreaType = "settings",
  Asset = "devices_other",
  AssetType = "settings",
  BatchOperation = "view_module",
  Schedule = "access_alarm",
  Zone = "timeline",
  Location = "room",
  Alert = "warning",
  Measurement = "ballot",
  Emulator = "settings_remote",
  Add = "add_circle",
  Edit = "create",
  Delete = "delete_forever",
  Filter = "filter_list",
  Up = "arrow_upward",
  Script = "description",
  Remotes = "router"
}

// Page sizes shown for event list pages.
export const EventPageSizes: IPageSizes = [
  {
    text: "25",
    value: 25
  },
  {
    text: "50",
    value: 50
  },
  {
    text: "100",
    value: 100
  }
];

// Table headers used for device locations.
export const LocationHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "Asset",
    value: "asset"
  },
  {
    align: "left",
    sortable: false,
    text: "Latitude/Longitude/Elevation",
    value: "lle"
  },
  {
    align: "left",
    sortable: false,
    text: "Event Date",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "Received Date",
    value: "received"
  }
];

// Table headers used for device locations.
export const AssignmentLocationHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "Latitude/Longitude/Elevation",
    value: "lle"
  },
  {
    align: "left",
    sortable: false,
    text: "Event Date",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "Received Date",
    value: "received"
  }
];

// Table headers used for device measurements.
export const MeasurementHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "Asset",
    value: "asset"
  },
  {
    align: "left",
    sortable: false,
    text: "Measurement Name",
    value: "mxname"
  },
  {
    align: "left",
    sortable: false,
    text: "Measurement Value",
    value: "mxvalue"
  },
  {
    align: "left",
    sortable: false,
    text: "Event Date",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "Received Date",
    value: "received"
  }
];

// Table headers used for device measurements.
export const AssignmentMeasurementHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "Measurement Name",
    value: "mxname"
  },
  {
    align: "left",
    sortable: false,
    text: "Measurement Value",
    value: "mxvalue"
  },
  {
    align: "left",
    sortable: false,
    text: "Event Date",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "Received Date",
    value: "received"
  }
];

// Table headers used for device alerts.
export const AlertHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "Asset",
    value: "asset"
  },
  {
    align: "left",
    sortable: false,
    text: "Type",
    value: "type"
  },
  {
    align: "left",
    sortable: false,
    text: "Message",
    value: "message"
  },
  {
    align: "left",
    sortable: false,
    text: "Event Date",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "Received Date",
    value: "received"
  }
];

// Table headers used for device alerts.
export const AssignmentAlertHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "Type",
    value: "type"
  },
  {
    align: "left",
    sortable: false,
    text: "Message",
    value: "message"
  },
  {
    align: "left",
    sortable: false,
    text: "Event Date",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "Received Date",
    value: "received"
  }
];

// Table headers used for device command responses.
export const ResponseHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "Originating Event Id",
    value: "oeid"
  },
  {
    align: "left",
    sortable: false,
    text: "Response",
    value: "response"
  },
  {
    align: "left",
    sortable: false,
    text: "Event Date",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "Received Date",
    value: "received"
  }
];

// Table headers used for device command invocations.
export const InvocationHeaders: ITableHeaders = [
  {
    align: "left",
    sortable: false,
    text: "Command",
    value: "command"
  },
  {
    align: "left",
    sortable: false,
    text: "Source",
    value: "source"
  },
  {
    align: "left",
    sortable: false,
    text: "Target",
    value: "target"
  },
  {
    align: "left",
    sortable: false,
    text: "Event Date",
    value: "event"
  },
  {
    align: "left",
    sortable: false,
    text: "Received Date",
    value: "received"
  }
];

// Command parameter types.
export const ParameterTypes: {
  text: string;
  datatype: ParameterType;
}[] = [
  {
    text: "String",
    datatype: ParameterType.String
  },
  {
    text: "Double",
    datatype: ParameterType.Double
  },
  {
    text: "Float",
    datatype: ParameterType.Float
  },
  {
    text: "Boolean",
    datatype: ParameterType.Bool
  },
  {
    text: "Int32",
    datatype: ParameterType.Int32
  },
  {
    text: "Int64",
    datatype: ParameterType.Int64
  },
  {
    text: "UInt32",
    datatype: ParameterType.UInt32
  },
  {
    text: "UInt64",
    datatype: ParameterType.UInt64
  },
  {
    text: "SInt32",
    datatype: ParameterType.SInt32
  },
  {
    text: "SInt64",
    datatype: ParameterType.SInt64
  },
  {
    text: "Fixed32",
    datatype: ParameterType.Fixed32
  },
  {
    text: "Fixed64",
    datatype: ParameterType.Fixed64
  },
  {
    text: "SFixed32",
    datatype: ParameterType.SFixed32
  },
  {
    text: "SFixed64",
    datatype: ParameterType.SFixed64
  }
];
