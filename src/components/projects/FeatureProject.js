"use client";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import FeatureProjectCard from "./FeatureProjectCard";
import { useProjects } from "@/hooks/useProjects";
import ProjectSkeleton from "@/components/skeleton/FeatureSkeleton";

export default function FeatureProject() {
  const { loading, fetchFeatureData, featureData } = useProjects();
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
            <br /> the Web3 industry&#39;s top talent with a combined
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
              <Grid
                container
                maxWidth="lg"
                className="projectForm !p-0 md:px-8 gap-6 !flex-nowrap featured-row "
              >
                <ProjectSkeleton />
              </Grid>
            ) : featureData?.length > 0 ? (
              featureData?.map((project, index) => (
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
