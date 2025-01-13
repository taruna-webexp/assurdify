"use client";
import LayoutHeader from "@/app/layoutHeader";
import ProjectTab from "@/components/projects/tabs/ProjectTab";
import projectService from "@/services/projectService";
import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { use } from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';
import Link from "next/link";
import XIcon from '@mui/icons-material/X';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
export default function SingleProject({ params }) {
    const { slug } = use(params); //
    const [project, setProject] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await projectService.getSingleProject({ slug });
                setProject(response);
            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        };

        fetchProject();
    }, [slug]);

    if (!project) {
        return (
            <Grid
                container
                spacing={4}
                maxWidth="sm"
                className="projectForm flex items-center justify-center h-screen !px-4 md:px-8"
            >
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <>
            <LayoutHeader pageTitle="Verification Details" />
            <div className="text-center">
                <button onClick={() => router.push("/")}>Back to projects</button>
            </div>
            <div className="flex items-center justify-center bg-gray-100 py-10">
                <div className="w-full md:w-3/4 lg:w-1/2 px-4 py-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="space-y-6">
                        <div className="flex">
                            <img src={project.images[0].url} width="10%" />
                            <div className="px-4">
                                <p className="text-4xl font-semibold text-indigo-700">{project.projectName}</p>


                                <span>{project.lowerCaseTickerName ? project.lowerCaseTickerName.toUpperCase() : ""}</span></div>
                            {
                                project.kycStatus === "Approved" &&



                                <img src="/assets/Profile_badge.png" width="10%" />}
                        </div>

                        <div>

                            <div>
                                {project?.twitterLink?.trim() && (
                                    <Link href={project.twitterLink}>
                                        <XIcon />
                                    </Link>
                                )}

                                {project?.telegramLink?.trim() && (
                                    <Link href={project.telegramLink}>
                                        <TelegramIcon />
                                    </Link>
                                )}

                                {project?.websiteLink?.trim() && (
                                    <Link href={project.websiteLink}>
                                        <LanguageIcon />
                                    </Link>
                                )}

                                {project?.mediumLink?.trim() && (
                                    <Link href={project.mediumLink}>
                                        <ScatterPlotIcon />
                                    </Link>
                                )}

                                {project?.chartLink?.trim() && (
                                    <Link href={project.chartLink}>
                                        <SportsEsportsIcon />
                                    </Link>
                                )}
                            </div>

                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed">{project.description}</p>
                        <div className="mt-4 text-sm text-gray-600">
                            <p>

                            </p>
                            {project.kycStatus !== "NotDetected" &&
                                <p>
                                    <span className="font-semibold">KYC date:</span> {format(new Date(project.kycDate), "MMMM do yyyy")}
                                </p>}
                        </div>
                        <ProjectTab project={project} />
                    </div>
                </div>
            </div>
        </>
    );
}
