import { ITableHeaders, IPageSizes } from "./navigation-model";

/**
 * Enumeration of navigation icons.
 */
export enum NavigationIcon {
  Device = "developer_board",
  DeviceType = "settings",
  DeviceGroup = "apps",
  Customer = "account_balance",
  CustomerType = "settings",
  Area = "collections",
  AreaType = "settings",
  Asset = "link",
  AssetType = "settings",
  BatchOperation = "view_module",
  Schedule = "access_alarm"
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
