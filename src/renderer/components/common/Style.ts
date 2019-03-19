import { IDeviceAssignment } from "sitewhere-rest-api";

// Common style declaration.
export type IStyle = { [id: string]: any };

/**
 * Get style information associated with device assignment status.
 * @param assignment
 */
export function styleForAssignmentStatus(
  assignment: IDeviceAssignment
): IStyle {
  return {
    "background-color": assignmentBackgroundColor(assignment),
    border: "1px solid " + assignmentBorderColor(assignment),
    "border-top": "5px solid " + assignmentHeaderColor(assignment)
  };
}

/**
 * Get background color associated with assignment status.
 * @param assignment
 */
export function assignmentBackgroundColor(
  assignment: IDeviceAssignment
): string {
  if (assignment) {
    if (assignment.status === "Active") {
      return "#f5fff5";
    } else if (assignment.status === "Missing") {
      return "#fff5f5";
    } else {
      return "#f0f0f0";
    }
  }
  return "#f0f0f0";
}

/**
 * Get border color associated with assignment status.
 * @param assignment
 */
export function assignmentBorderColor(assignment: IDeviceAssignment): string {
  if (assignment) {
    if (assignment.status === "Active") {
      return "#99cc99";
    } else if (assignment.status === "Missing") {
      return "#cc9999";
    } else {
      return "#dcdcdc";
    }
  }
  return "#dcdcdc";
}

/**
 * Get header color associated with assignment status.
 * @param assignment
 */
export function assignmentHeaderColor(assignment: IDeviceAssignment): string {
  if (assignment) {
    if (assignment.status === "Active") {
      return "#007700";
    } else if (assignment.status === "Missing") {
      return "#dc0000";
    } else {
      return "#333333";
    }
  }
  return "#333333";
}
