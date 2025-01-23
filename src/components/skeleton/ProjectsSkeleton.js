"use client"
import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export default function ProjectSkeleton() {

    return (
        <Grid
            container
            spacing={4}
            className="projectForm !px-0 md:px-8 max-w-screen-lg container !w-full projects-list-cont"
        >
            {new Array(6).fill(0).map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index} className="!p-0 collunm">
                    <Card className="light-yellow-border theme-bg">
                        <div className="flex justify-between p-3">
                            <div className="flex items-center gap-1.5">
                                <Skeleton
                                    variant="circular"
                                    width={40}
                                    height={40}
                                    className="border-2"
                                />
                                <div>
                                    <Skeleton
                                        variant="text"
                                        width={100}
                                        height={20}
                                        sx={{ bgcolor: "grey.900" }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={60}
                                        height={15}
                                        sx={{ bgcolor: "grey.800" }}
                                    />
                                </div>
                            </div>
                            <Skeleton variant="circular" width={40} height={40} />
                        </div>
                        <CardContent className="!px-3 !pb-3 !pt-0">
                            <Skeleton
                                variant="rectangular"
                                height={80}
                                sx={{ bgcolor: "grey.900" }}
                            />
                        </CardContent>
                        <CardActions className="!p-3 light-purple flex justify-between">
                            <Skeleton
                                variant="text"
                                width={80}
                                height={15}
                                sx={{ bgcolor: "grey.800" }}
                            />
                            <Skeleton
                                variant="text"
                                width={60}
                                height={15}
                                sx={{ bgcolor: "grey.700" }}
                            />
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

// else if (type === "Verification") {
//     <div className="flex items-center justify-center pb-6 pt-1 bg-transparent card-section">
//         <div className="card-container relative m-auto w-full">
//             <div className="p-5 single-card bg-cover relative theme-border-light z-10">
//                 <div className="space-y-6">
//                     <div className="flex items-center cart-title">
//                         {/* Circular Skeleton for Image */}
//                         <Skeleton
//                             variant="circular"
//                             width={56} // Adjusted for consistency with original image dimensions
//                             height={56}
//                             className="border-4"
//                         />
//                         <div className="pl-3">
//                             {/* Skeleton for Title */}
//                             <Skeleton
//                                 variant="text"
//                                 width={150} // Approximate width for project title
//                                 height={30}
//                                 className="mb-1"
//                             />
//                             {/* Skeleton for Subtitle */}
//                             <Skeleton
//                                 variant="text"
//                                 width={100} // Approximate width for subtitle
//                                 height={20}
//                             />
//                         </div>
//                         {/* Skeleton for Badge */}
//                         <Skeleton
//                             variant="rectangular"
//                             width={96}
//                             height={24}
//                             className="absolute top-0 right-6"
//                         />
//                     </div>

//                     {/* Skeleton for Description */}
//                     <div className="space-y-2">
//                         <Skeleton variant="text" width="100%" height={15} />
//                         <Skeleton variant="text" width="95%" height={15} />
//                         <Skeleton variant="text" width="90%" height={15} />
//                     </div>

//                     <div className="flex justify-between items-center social-date mt-3">
//                         <div className="social-icons flex gap-2">
//                             {/* Placeholder Skeletons for Social Links */}
//                             {[1, 2, 3].map((_, index) => (
//                                 <Skeleton
//                                     key={index}
//                                     variant="circular"
//                                     width={40}
//                                     height={40}
//                                 />
//                             ))}
//                         </div>
//                         {/* Skeleton for KYC Info */}
//                         <Skeleton variant="text" width={100} height={20} />
//                     </div>

//                     {/* Skeleton for Tabs */}
//                     <div className="!mt-3">
//                         <Skeleton variant="rectangular" width="100%" height={40} className="mb-3 rounded-md" />
//                         <Skeleton variant="text" width="70%" height={15} />
//                         <Skeleton variant="text" width="80%" height={15} />
//                         <Skeleton variant="text" width="60%" height={15} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// }

ProjectSkeleton.propTypes = {
    loading: PropTypes.bool,
};

