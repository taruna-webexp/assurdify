"use client"
import React, { useEffect, useState, useCallback } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import ProjectCards from "@/components/projects/ProjectCards";
import ProjectPagination from "@/components/utility/ProjectPagination";
import projectService from "@/services/projectService"; // API service
import { useForm } from "react-hook-form";
import ProjectFilterForm from "@/components/projects/form/ProjectFilterForm";
import UpperSection from "@/components/projects/UpperSection";
import { errorMsg } from "@/components/toaster/msg/toaster";

const recordsPerPage = 18; // Records to display per page

export default function Explore() {
    const [projects, setProjects] = useState([]);
    const [offsetStack, setOffsetStack] = useState([]); // Stack to track offsets
    const [currentOffset, setCurrentOffset] = useState(null); // Current offset for API
    const [totalProjects, setTotalProjects] = useState(0); // Total projects count from server
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Current page
    const { control, handleSubmit, formState: { errors } } = useForm();

    // Fetch projects dynamically with server-side pagination
    const fetchProjects = useCallback(async (offset) => {
        console.log("Fetching with offset:", offset);
        setLoading(true);
        try {
            const response = await projectService.getAllProjects({
                offset: offset || "",
                pageSize: recordsPerPage,
                sortBy: "kycDate",
                sortOrder: "desc",
            });
            setProjects(response.records);
            setTotalProjects(response.records.length);
            setCurrentOffset(response.offset); // Update current offset with the new response offset
        } catch (error) {
            errorMsg(error)
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchProjects(null);
    }, [fetchProjects]);

    // Pagination page change handler
    const handlePaginationPageChange = async (event, value) => {
        if (value > page) {
            // Going to the next page
            setOffsetStack([...offsetStack, currentOffset]); // Push current offset to stack
            fetchProjects(currentOffset);
        } else if (value < page) {
            // Going to the previous page
            const prevOffset = offsetStack[offsetStack.length - 2];
            setOffsetStack(offsetStack.slice(0, -1));
            console.log("offsetStack", offsetStack);
            fetchProjects(prevOffset);
        }
        setPage(value); // Update current page
    };

    // Filter handler
    const onSubmit = async (data) => {
        setLoading(true); // Start loading

        // Transform data  dynamically set the keyvalue pair
        const { projectSearch, projectbySearch, ...rest } = data;
        const transformedData = {
            ...rest,
            [projectbySearch]: projectSearch,
        };


        try {
            // API call with the transformed data
            const response = await projectService.getFilteredProjects({
                auditStatus: data.projectAditStatus === "allAudit" ? "" : transformedData.projectAditStatus,
                kycStatus: transformedData.projectKeyStatus === "allKYC" ? "" : transformedData.projectKeyStatus,
                projectName: transformedData.projectName || "",
                contractAddress: transformedData.contractAddress || "",
                tickerName: transformedData.tickerName || "",
                pageSize: recordsPerPage,
                offset: "",
                sortBy: "kycDate",
                sortOrder: "desc",

            });
            setProjects(response.records);
            setCurrentOffset(response.offset);
            setTotalProjects(response.records.length);
            setPage(1);
            setOffsetStack([]);
        } catch (error) {
            console.error("Error applying filters:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {/* Upper Section */}
            <UpperSection />
            <h3 className="text-4xl !mt-3 font-normal text-3xl projects-heading text-center !leading-10">Explore Over <b>1000</b> Projects</h3>
            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 mb-10">
                <ProjectFilterForm control={control} errors={errors} />
            </form>
            {/* Loading or Projects */}
            {loading ? (
                <Grid container justifyContent="center" className="my-5">
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    {/* Default Response if No Projects Found */}
                    {projects.length === 0 ? (
                        <Grid container justifyContent="center" className="my-5">
                            <Typography variant="h6" color="text-white">
                                No projects found. Please adjust your filters.
                            </Typography>
                        </Grid>
                    ) : (
                        <>
                            {/* project all data section */}
                            <Grid
                                container
                                spacing={3}
                                justifyContent="center"
                                className="my-5"
                            >
                                <ProjectCards data={projects} />
                            </Grid>
                            {/* pagination section */}
                            <Grid container justifyContent="center" my={5}>
                                <ProjectPagination
                                    count={totalProjects}
                                    page={page}
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
