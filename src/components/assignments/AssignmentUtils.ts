import {
    IDevice,
    IDeviceType,
    ICustomer,
    IArea,
    IAsset,
    IDeviceAssignment,
    IDeviceAssignmentSummary
} from "sitewhere-rest-api";

export function convertAssignmentToSummary(
    assignment: IDeviceAssignment
): IDeviceAssignmentSummary {
    const device: IDevice = (assignment as any).device;
    const deviceType: IDeviceType = device ? (device as any).deviceType : null;
    const customer: ICustomer = (assignment as any).customer;
    const area: IArea = (assignment as any).area;
    const asset: IAsset = (assignment as any).asset;
    const summary: IDeviceAssignmentSummary = {
        id: assignment.id,
        token: assignment.token,
        deviceId: assignment.deviceId,
        deviceToken: device ? device.token : "",
        deviceTypeId: assignment.deviceTypeId,
        deviceTypeName: deviceType ? deviceType.name : "",
        deviceTypeImageUrl: deviceType ? deviceType.imageUrl : "",
        customerId: assignment.customerId,
        customerName: customer ? customer.name : undefined,
        customerImageUrl: customer ? customer.imageUrl : undefined,
        areaId: assignment.customerId,
        areaName: area ? area.name : undefined,
        areaImageUrl: area ? area.imageUrl : undefined,
        assetId: assignment.assetId,
        assetName: asset ? asset.name : undefined,
        assetImageUrl: asset ? asset.imageUrl : undefined,
        createdBy: assignment.createdBy,
        createdDate: assignment.createdDate,
        activeDate: assignment.activeDate,
        metadata: assignment.metadata,
        releasedDate: assignment.releasedDate,
        status: assignment.status,
        updatedBy: assignment.updatedBy,
        updatedDate: assignment.updatedDate
    }
    return summary;
}
