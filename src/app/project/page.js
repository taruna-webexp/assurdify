"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ProjectCards from "@/components/projects/ProjectCards";
import ProjectPagination from "@/components/utility/ProjectPagination";
import { useForm } from "react-hook-form";
import ProjectFilterForm from "@/components/projects/form/ProjectFilterForm";
import { useProjects } from "@/hooks/useProjects";
import FeatureProject from "@/components/projects/FeatureProject";
import ProjectSkeleton from "@/components/skeleton/ProjectsSkeleton";

export default function Explore() {
  const {
    projects,
    totalProjects,
    loading,
    currentOffset,
    offsetStack,
    setOffsetStack,
    fetchProjects,
  } = useProjects();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Initial fetch
  useEffect(() => {
    fetchProjects(filter);
  }, [filter, fetchProjects]);

  // Pagination handler
  const handlePaginationPageChange = (event, value) => {
    if (value > page) {
      setOffsetStack([...offsetStack, currentOffset]);
      fetchProjects(filter, currentOffset);
    } else if (value < page) {
      const prevOffset = offsetStack[offsetStack.length - 2];
      setOffsetStack(offsetStack.slice(0, -1));
      fetchProjects(filter, prevOffset);
    }
    setPage(value);
  };

  // Filter handler
  const handleFilterSubmit = (data) => {
    const { projectSearch, projectbySearch, ...rest } = data;
    const filters = {
      ...rest,
      [projectbySearch]: projectSearch,
      auditStatus:
        data.projectAditStatus === "allAudit" ? "" : data.projectAditStatus,
      kycStatus:
        data.projectKeyStatus === "allKYC" ? "" : data.projectKeyStatus,
    };
    setFilter(filters);
    fetchProjects(filters);
    setOffsetStack("");
    setPage(1);
  };

  return (
    <div style={{ minHeight: "100px" }}>
      {/* Feature Project Section */}
      <FeatureProject />
      <div id="target-section" className="explore-project-container ">
        <h3 className="text-4xl !mt-8 font-normal text-3xl projects-heading text-center !leading-10">
          Explore Over <b>1000</b> Projects
        </h3>
        {/* Form Section */}
        <form onSubmit={handleSubmit(handleFilterSubmit)} className="mt-6 mb-8">
          <ProjectFilterForm control={control} errors={errors} />
        </form>
      </div>
      {/* Loading or Projects */}
      {loading ? (
        <div style={{ minHeight: "400px" }}>
          <ProjectSkeleton type="Explore" />
        </div>
      ) : (
        <>
          {/* Default Response if No Projects Found */}
          {projects.length === 0 ? (
            <Grid container justifyContent="center" className="my-5">
              <Typography
                variant="h6"
                color="text-white"
                className="data-not-found"
              >
                NO DATA FOUND
              </Typography>
            </Grid>
          ) : (
            <>
              {/* project all data section */}
              <Grid
                container
                spacing={3}
                justifyContent="center"
                className="!m-0 !w-full"
                style={{ minHeight: "400px" }}
              >
                <ProjectCards data={projects} />
              </Grid>
              {/* pagination section */}
              <Grid
                container
                justifyContent="center"
                my={5}
                className="max-w-screen-lg container mx-auto !justify-end projects-pagination"
              >
                <ProjectPagination
                  count={totalProjects}
                  page={page}
                  currentOffset={currentOffset}
                  onChange={handlePaginationPageChange}
                />
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
}
