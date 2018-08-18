import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login";
import SystemAdministration from "@/components/SystemAdministration";
import TenantsList from "@/components/tenants/TenantsList";
import TenantDetail from "@/components/tenants/TenantDetail";
import TenantMicroserviceEditor from "@/components/tenants/TenantMicroserviceEditor";
import UsersList from "@/components/users/UsersList";
import GlobalMicroservicesList from "@/components/global/GlobalMicroservicesList";
import GlobalMicroserviceEditor from "@/components/global/GlobalMicroserviceEditor";
import TenantAdministration from "@/components/tenants/TenantAdministration";
import Server from "@/components/server/Server";
import CustomerTypesList from "@/components/customertypes/CustomerTypesList";
import CustomerTypeDetail from "@/components/customertypes/CustomerTypeDetail";
import CustomersList from "@/components/customers/CustomersList";
import CustomerDetail from "@/components/customers/CustomerDetail";
import AreaTypesList from "@/components/areatypes/AreaTypesList";
import AreaTypeDetail from "@/components/areatypes/AreaTypeDetail";
import AreasList from "@/components/areas/AreasList";
import AreaDetail from "@/components/areas/AreaDetail";
import AssignmentDetail from "@/components/assignments/AssignmentDetail";
import AssignmentEmulator from "@/components/assignments/AssignmentEmulator";
import DeviceTypesList from "@/components/devicetypes/DeviceTypesList";
import DeviceTypeDetail from "@/components/devicetypes/DeviceTypeDetail";
import DevicesList from "@/components/devices/DevicesList";
import DeviceDetail from "@/components/devices/DeviceDetail";
import DeviceGroupsList from "@/components/devicegroups/DeviceGroupsList";
import DeviceGroupDetail from "@/components/devicegroups/DeviceGroupDetail";
import DeviceStatesList from "@/components/devicestates/DeviceStatesList";
import AssetTypesList from "@/components/assettypes/AssetTypesList";
import AssetTypeDetail from "@/components/assettypes/AssetTypeDetail";
import AssetsList from "@/components/assets/AssetsList";
import AssetDetail from "@/components/assets/AssetDetail";
import BatchOperationsList from "@/components/batch/BatchOperationsList";
import BatchOperationDetail from "@/components/batch/BatchOperationDetail";
import SchedulesList from "@/components/schedules/SchedulesList";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
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
          path: "tenants/:tenantToken",
          component: TenantDetail
        },
        {
          path: "tenants/:tenantToken/:identifier",
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
  ]
});
