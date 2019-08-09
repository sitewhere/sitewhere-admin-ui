import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

import Login from "@/components/Login.vue";
import SystemAdministration from "@/components/SystemAdministration.vue";
import TenantsList from "@/components/tenants/TenantsList.vue";
import TenantDetail from "@/components/tenants/TenantDetail.vue";
import TenantMicroserviceEditor from "@/components/tenants/TenantMicroserviceEditor.vue";
import UsersList from "@/components/users/UsersList.vue";
import GlobalMicroservicesList from "@/components/global/GlobalMicroservicesList.vue";
import GlobalMicroserviceEditor from "@/components/global/GlobalMicroserviceEditor.vue";
import TenantAdministration from "@/components/tenants/TenantAdministration.vue";
import Server from "@/components/server/Server.vue";
import CustomerTypesList from "@/components/customertypes/CustomerTypesList.vue";
import CustomerTypeDetail from "@/components/customertypes/CustomerTypeDetail.vue";
import CustomersList from "@/components/customers/CustomersList.vue";
import CustomerDetail from "@/components/customers/CustomerDetail.vue";
import AreaTypesList from "@/components/areatypes/AreaTypesList.vue";
import AreaTypeDetail from "@/components/areatypes/AreaTypeDetail.vue";
import AreasList from "@/components/areas/AreasList.vue";
import AreaDetail from "@/components/areas/AreaDetail.vue";
import AssignmentsList from "@/components/assignments/AssignmentsList.vue";
import AssignmentDetail from "@/components/assignments/AssignmentDetail.vue";
import AssignmentEmulator from "@/components/assignments/emulator/AssignmentEmulator.vue";
import DeviceTypesList from "@/components/devicetypes/DeviceTypesList.vue";
import DeviceTypeDetail from "@/components/devicetypes/DeviceTypeDetail.vue";
import DevicesList from "@/components/devices/DevicesList.vue";
import DeviceDetail from "@/components/devices/DeviceDetail.vue";
import DeviceGroupsList from "@/components/devicegroups/DeviceGroupsList.vue";
import DeviceGroupDetail from "@/components/devicegroups/DeviceGroupDetail.vue";
import DeviceStatesList from "@/components/devicestates/DeviceStatesList.vue";
import AssetTypesList from "@/components/assettypes/AssetTypesList.vue";
import AssetTypeDetail from "@/components/assettypes/AssetTypeDetail.vue";
import AssetsList from "@/components/assets/AssetsList.vue";
import AssetDetail from "@/components/assets/AssetDetail.vue";
import BatchOperationsList from "@/components/batch/BatchOperationsList.vue";
import BatchOperationDetail from "@/components/batch/BatchOperationDetail.vue";
import SchedulesList from "@/components/schedules/SchedulesList.vue";

Vue.use(Router);

const routes = <Array<RouteConfig>>[
  {
    path: "/",
    component: Login
  },
  {
    path: "/system",
    component: SystemAdministration,
    children: [
      {
        path: "tenants",
        component: TenantsList
      },
      {
        path: "tenants/:token",
        component: TenantDetail
      },
      {
        path: "tenants/:token/:identifier",
        component: TenantMicroserviceEditor
      },
      {
        path: "users",
        component: UsersList
      },
      {
        path: "microservices",
        component: GlobalMicroservicesList
      },
      {
        path: "microservices/:identifier",
        component: GlobalMicroserviceEditor
      }
    ]
  },
  {
    path: "/tenants/:tenantToken",
    component: TenantAdministration,
    children: [
      {
        path: "server",
        component: Server
      },
      {
        path: "customertypes",
        component: CustomerTypesList
      },
      {
        path: "customertypes/:token",
        component: CustomerTypeDetail
      },
      {
        path: "customers",
        component: CustomersList
      },
      {
        path: "customers/:token",
        component: CustomerDetail
      },
      {
        path: "areatypes",
        component: AreaTypesList
      },
      {
        path: "areatypes/:token",
        component: AreaTypeDetail
      },
      {
        path: "areas",
        component: AreasList
      },
      {
        path: "areas/:token",
        component: AreaDetail
      },
      {
        path: "assignments",
        component: AssignmentsList
      },
      {
        path: "assignments/:token",
        component: AssignmentDetail
      },
      {
        path: "assignments/:token/emulator",
        component: AssignmentEmulator
      },
      {
        path: "devicetypes",
        component: DeviceTypesList
      },
      {
        path: "devicetypes/:token",
        component: DeviceTypeDetail
      },
      {
        path: "devices",
        component: DevicesList
      },
      {
        path: "devices/:token",
        component: DeviceDetail
      },
      {
        path: "groups",
        component: DeviceGroupsList
      },
      {
        path: "groups/:token",
        component: DeviceGroupDetail
      },
      {
        path: "devicestates",
        component: DeviceStatesList
      },
      {
        path: "assettypes",
        component: AssetTypesList
      },
      {
        path: "assettypes/:token",
        component: AssetTypeDetail
      },
      {
        path: "assets",
        component: AssetsList
      },
      {
        path: "assets/:token",
        component: AssetDetail
      },
      {
        path: "batch",
        component: BatchOperationsList
      },
      {
        path: "batch/:token",
        component: BatchOperationDetail
      },
      {
        path: "schedules",
        component: SchedulesList
      }
    ]
  }
];

export default new Router({
  // mode: 'history',
  routes: routes
});
