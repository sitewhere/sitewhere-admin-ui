import { ITableHeaders, IPageSizes, INavigationSection, NavigationIcon } from "sitewhere-ide-common";
import { ParameterType } from "sitewhere-rest-api";

/** Device types section */
export const DeviceTypesSection: INavigationSection = {
  id: "devicetypes",
  title: "Device Types",
  icon: NavigationIcon.DeviceType,
  route: "devicetypes",
  longTitle: "Manage Device Types"
}

/** Devices section */
export const DevicesSection: INavigationSection = {
  id: "devices",
  title: "Devices",
  icon: NavigationIcon.Device,
  route: "devices",
  longTitle: "Manage Devices"
}

/** Device assignments section */
export const DeviceAssignmentsSection: INavigationSection = {
  id: "assignments",
  title: "Device Assignments",
  icon: NavigationIcon.DeviceAssignment,
  route: "assignments",
  longTitle: "Manage Assignments"
}

/** Assignment emulator section */
export const AssignmentEmulatorSection: INavigationSection = {
  id: "assignments",
  title: "Device Assignment Emulator",
  icon: NavigationIcon.DeviceAssignment,
  route: "emulator",
  longTitle: "Device Assignment Emulator"
}

/** Device groups section */
export const DeviceGroupsSection: INavigationSection = {
  id: "groups",
  title: "Device Groups",
  icon: NavigationIcon.DeviceGroup,
  route: "groups",
  longTitle: "Manage Device Groups"
}

/** Devices group */
export const DevicesGroup: INavigationSection = {
  id: "deviceGroup",
  title: "Device Management",
  icon: NavigationIcon.Device,
  route: "devices",
  longTitle: "Manage Devices",
  subsections: [DeviceTypesSection, DevicesSection, DeviceAssignmentsSection, DeviceGroupsSection]
}

/** Customer types section */
export const CustomerTypesSection: INavigationSection = {
  id: "customertypes",
  title: "Customer Types",
  icon: NavigationIcon.CustomerType,
  route: "customertypes",
  longTitle: "Manage Customer Types"
}

/** Customers section */
export const CustomersSection: INavigationSection = {
  id: "customers",
  title: "Customers",
  icon: NavigationIcon.Customer,
  route: "customers",
  longTitle: "Manage Customers"
}

/** Customers group */
export const CustomersGroup: INavigationSection = {
  id: "customersGroup",
  title: "Customer Management",
  icon: NavigationIcon.Customer,
  route: "customers",
  longTitle: "Manage Customers",
  subsections: [CustomerTypesSection, CustomersSection]
}

/** Area types section */
export const AreaTypesSection: INavigationSection = {
  id: "areatypes",
  title: "Area Types",
  icon: NavigationIcon.AreaType,
  route: "areatypes",
  longTitle: "Manage Area Types"
}

/** Areas section */
export const AreasSection: INavigationSection = {
  id: "areas",
  title: "Areas",
  icon: NavigationIcon.Area,
  route: "areas",
  longTitle: "Manage Areas"
}

/** Areas group */
export const AreasGroup: INavigationSection = {
  id: "areasGroup",
  title: "Area Management",
  icon: NavigationIcon.Area,
  route: "areas",
  longTitle: "Manage Areas",
  subsections: [AreaTypesSection, AreasSection]
}

/** Asset types section */
export const AssetTypesSection: INavigationSection = {
  id: "assettypes",
  title: "Asset Types",
  icon: NavigationIcon.AssetType,
  route: "assettypes",
  longTitle: "Manage Asset Types"
}

/** Assets section */
export const AssetsSection: INavigationSection = {
  id: "assets",
  title: "Assets",
  icon: NavigationIcon.Asset,
  route: "assets",
  longTitle: "Manage Assets"
}

/** Assets group */
export const AssetsGroup: INavigationSection = {
  id: "assetGroup",
  title: "Asset Management",
  icon: NavigationIcon.Asset,
  route: "assets",
  longTitle: "Manage Assets",
  subsections: [AssetTypesSection, AssetsSection]
}

/** Batch operations group */
export const BatchOperationsGroup: INavigationSection = {
  id: "batch",
  title: "Batch Operations",
  icon: NavigationIcon.BatchOperation,
  route: "batch",
  longTitle: "Manage Batch Operations"
}

/** Schedules group */
export const SchedulesGroup: INavigationSection = {
  id: "schedules",
  title: "Schedules",
  icon: NavigationIcon.Schedule,
  route: "schedules",
  longTitle: "Manage Schedules"
}

/** Page sizes shown for event list pages */
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
