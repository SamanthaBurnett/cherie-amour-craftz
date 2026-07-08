export function formatCustomRequestStatus(status: string) {
  const statusLabels: Record<string, string> = {
    PENDING_REVIEW: "Pending Review",

    ACCEPTED: "Accepted",

    DECLINED: "Declined",

    IN_PROGRESS: "In Progress",

    COMPLETED: "Completed",

    CANCELLED: "Cancelled",
  };

  return statusLabels[status] ?? status;
}
