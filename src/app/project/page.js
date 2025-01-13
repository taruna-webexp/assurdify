"use client"
import React, { useEffect, useState, useCallback } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import ProjectCards from "@/components/projects/ProjectCards";
import ProjectPagination from "@/components/utility/ProjectPagination";
import projectService from "@/services/projectService"; // API service
import { useForm } from "react-hook-form";
import ProjectFilterForm from "@/components/projects/form/ProjectFilterForm";
import LayoutHeader from "../layoutHeader";

const recordsPerPage = 18; // Records to display per page

export default function Explore() {
    const [projects, setProjects] = useState([]);
    const [offset, setOffset] = useState(null); // Current offset for API
    const [previousOffset, setPreviousOffset] = useState(null); // Track the previous offset
    const [totalProjects, setTotalProjects] = useState(0); // Total projects count from server
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Current page
    const { control, handleSubmit, formState: { errors } } = useForm();

    // Fetch projects dynamically with server-side pagination
    const fetchProjects = useCallback(async (currentOffset) => {
        console.log("currentOffset", currentOffset);
        setLoading(true); // Start loading
        try {
            const response = await projectService.getAllProjects({
                offset: currentOffset || "", // Use provided offset (current or previous)
                pageSize: recordsPerPage,
                sortBy: "kycDate",
                sortOrder: "desc",
            });
            console.log("res", response.records);
            setProjects(response.records); // Set fetched records
            setPreviousOffset(offset); // Store the current offset as the previous offset
            setOffset(response.offset); // Update current offset with the new response offset
            setTotalProjects(response.totalCount); // Update total project count from server
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [offset]);

    useEffect(() => {
        // Trigger the first fetch on initial load
        fetchProjects(""); // Initially pass `null` or `""` to handle the offset
    }, []); // This effect runs only once when the component mounts

    // Pagination page change handler
    const handlePaginationPageChange = async (event, value) => {
        setPage(value);
        console.log("2345", value, page);
        if (value > page) {
            // When going to next page, use the current offset
            fetchProjects(offset);
        } else {
            // When going to previous page, use the previous offset
            fetchProjects(previousOffset);
        }
    };

    // Filter handler
    const onSubmit = async (data) => {
        setLoading(true); // Start loading
        console.log("Original data:", data);

        // Transform data
        const { projectSearch, projectbySearch, ...rest } = data; // Destructure data
        const transformedData = {
            ...rest,
            [projectbySearch]: projectSearch, // Dynamically set the key-value pair
        };

        console.log("Transformed data:", transformedData);

        try {
            // Make the API call with the transformed data
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

            // Update state with API response
            setProjects(response.records);
            setOffset(response.offset);
            setTotalProjects(response.totalCount);
            setPage(1); // Reset to the first page of filtered results
        } catch (error) {
            console.error("Error applying filters:", error);
        } finally {
            setLoading(false); // End loading
        }
    };



    return (
        <div>
            <LayoutHeader pageTitle="Explore Over 1000 Projects" />
            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="my-7">
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
                            <Typography variant="h6" color="textSecondary">
                                No projects found. Please adjust your filters.
                            </Typography>
                        </Grid>
                    ) : (
                        <>
                            <Grid
                                container
                                spacing={3}
                                justifyContent="center"
                                className="my-5"
                            >
                                {/* Pass only sliced data for the current page */}
                                <ProjectCards data={projects} />
                            </Grid>
                            <Grid container justifyContent="center" my={5}>
                                <ProjectPagination
                                    count={Math.ceil(totalProjects / recordsPerPage)}
                                    page={page} // Page number from offset
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
