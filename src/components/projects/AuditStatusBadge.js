import React from "react";
import { Typography } from "@mui/material";

export const AuditStatusBadge = ({ auditStatus, kycStatus }) => {
    // Determine the text and class based on the auditStatus and kycStatus
    let badgeText = "";
    let badgeClass = "";

    if (auditStatus === "Completed" && kycStatus !== "Rejected") {
        badgeText = "Audited";
        badgeClass = "text-green !font-semibold";
    } else if (auditStatus === "NotDetected" && kycStatus === "Approved") {
        badgeText = "Not Audited";
        badgeClass = "text-red !font-semibold";
    }

    // If no badgeText is set, return null (no badge)
    if (!badgeText) return null;

    return (
        <Typography className={badgeClass} variant="body2">
            {badgeText}
        </Typography>
    );
};

