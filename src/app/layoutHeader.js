import React from "react";

import { Typography } from "@mui/material";

function LayoutHeader({ pageTitle }) {
    return (
        <div className="text-center">
            <Typography
                variant="span"
                className="text-4xl !mt-3 font-semibold pb-1 text-3xl inline-block "
            >
                {pageTitle}
            </Typography>
        </div>
    );
}

export default LayoutHeader;
