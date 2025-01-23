import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import React from "react";

export default function FeatureSkeleton() {
    return (
        <Grid container spacing={3}>
            {new Array(2).fill(0).map((item, index) => (
                <Grid item xs={12} sm={6} md={6} key={index} className="featured-collunm">
                    <Card className="theme-border-light gradient-bg-sharp-feature !rounded-lg">
                        <div className="flex justify-between p-3">
                            <div className="flex items-center gap-1.5">
                                {/* Circular Skeleton for Image */}
                                <Skeleton variant="circular" width={40} height={40} className="border-2" />
                                <div>
                                    {/* Skeleton for Project Name */}
                                    <Skeleton variant="text" width={120} height={20} />
                                    {/* Skeleton for Subtitle */}
                                    <Skeleton variant="text" width={80} height={15} />
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {/* Skeleton for Badge */}
                                <Skeleton variant="rectangular" width={40} height={40} />
                                {/* Skeleton for Member Count */}
                                <Skeleton variant="text" width={30} height={20} />
                            </div>
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
