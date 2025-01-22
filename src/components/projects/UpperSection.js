"use client";
import projectService from "@/services/projectService";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CircularLoader from "../loader/CircularLoader";
import FeatureProjectCard from "./FeatureProjectCard";

export default function UpperSection() {
    const [featureData, setFeatureData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchFeatureData = async () => {
        setLoading(true);
        try {
            const response = await projectService.getFeatureProject({
                pageSize: 18,
                featured: "Yes",
            });
            setFeatureData(response.records);
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFeatureData();
    }, []);
    return (
        <div className="verified-project-section">
            <div className="container max-w-screen-lg mx-auto verified-project-container relative">
                <div className="text-center pt-14 mb-16 relative upper-section">
                    <h2 className="text-5xl leading-tight text-gradient mb-5 heading">
                        Assure DeFi
                        <br /> Verified Projects
                    </h2>
                    <p className="text-lg leading-6 font-light mb-8 sub-text">
                        Our network of verified projects boasts some of
                        <br /> the Web3 industry's top talent with a combined
                        <br /> market cap of $1.6 Billion
                    </p>
                    <Link
                        href="https://www.assuredefi.com/#get-kyc"
                        className="gradient-bg py-5 px-28 theme-border rounded-md inline-block font-semibold site-button"
                    >
                        GET YOUR PROJECT LISTED
                    </Link>
                </div>
                <div className="theme-border-light rounded-xl featured-project px-6 pb-6 pt-4 mb-6 relative">
                    <h3 className="text-center text-gradient text-32 leading-10 mb-5">
                        Featured Projects
                    </h3>

                    <Grid
                        container
                        maxWidth="lg"
                        className="projectForm !p-0 md:px-8 gap-6 !flex-nowrap featured-row "
                    >
                        {loading ? (
                            <Grid container justifyContent="center" className="my-5">
                                <CircularLoader />
                            </Grid>
                        ) : featureData.length > 0 ? (
                            featureData.map((project, index) => (
                                <FeatureProjectCard key={index} project={project} />
                            ))
                        ) : (
                            <Grid container justifyContent="center" className="my-5">
                                <Typography variant="h6" color="text-white">
                                    No Featured Projects Available
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </div>
            </div>
        </div>
    );
}
