import { Skeleton } from "@mui/material";
import React from "react";

export default function DeatailSkeleton() {
    return (
        <div className="flex items-center justify-center pb-6 pt-1 bg-transparent card-section">
            <div className="card-container relative m-auto w-full">
                <div className="p-5 single-card bg-cover relative theme-border-light z-10">
                    <div className="space-y-6">
                        <div className="flex items-center cart-title">
                            {/* Circular Skeleton for Image */}
                            <Skeleton
                                variant="circular"
                                width={56} // Adjusted for consistency with original image dimensions
                                height={56}
                                className="border-4"
                            />
                            <div className="pl-3 w-full">
                                {/* Skeleton for Title */}
                                <Skeleton variant="text" width="100%" height={50} sx={{ bgcolor: "grey.500" }} />

                                {/* Skeleton for Subtitle */}
                                <Skeleton
                                    variant="text"
                                    width={100} // Approximate width for subtitle
                                    height={20}
                                    sx={{ bgcolor: "grey.500" }}
                                />
                            </div>
                            {/* Skeleton for Badge */}

                        </div>


                        <div className="space-y-2">
                            <Skeleton variant="text" width="100%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="95%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="90%" height={15} sx={{ bgcolor: "grey.500" }} />
                        </div>

                        <div className="space-y-2">
                            <Skeleton variant="text" width="100%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="95%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="90%" height={15} sx={{ bgcolor: "grey.500" }} />
                        </div> <div className="space-y-2">
                            <Skeleton variant="text" width="100%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="95%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="90%" height={15} sx={{ bgcolor: "grey.500" }} />
                        </div>

                        <div className="space-y-2">
                            <Skeleton variant="text" width="100%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="95%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="90%" height={15} sx={{ bgcolor: "grey.500" }} />
                        </div> <div className="space-y-2">
                            <Skeleton variant="text" width="100%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="95%" height={15} sx={{ bgcolor: "grey.500" }} />
                            <Skeleton variant="text" width="90%" height={15} sx={{ bgcolor: "grey.500" }} />
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}
