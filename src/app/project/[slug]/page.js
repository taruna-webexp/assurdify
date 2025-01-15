"use client";
import LayoutHeader from "@/app/layoutHeader";
import ProjectTab from "@/components/projects/tabs/ProjectTab";
import projectService from "@/services/projectService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { use } from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';
import Link from "next/link";
import XIcon from '@mui/icons-material/X';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'; import CircularLoader from "@/components/loader/CircularLoader";
import { Grid } from "@mui/material";
CircularLoader
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
                <CircularLoader />
            </Grid>
        );
    }

    return (
        <>
            <LayoutHeader pageTitle="Verification Details" />
            <div className="text-center">
                <button onClick={() => router.push("/")}>Back to projects</button>
            </div>
            <div className="flex items-center justify-center bg-gray-100 py-10 bg-transparent">
                <div className="p-6 single-card bg-cover relative">
                    <div className="space-y-6">
                        <div className="flex">
                            <img src={project.images[0].url} width="10%" class="border-4 w-14 h-14 rounded-full" />
                            <div className="pl-3">
                                <h2 className="font-extrabold text-3xl text-white">{project.projectName}</h2>


                                <span className="text-lg leading-5 grey-color">{project.lowerCaseTickerName ? project.lowerCaseTickerName.toUpperCase() : ""}</span></div>
                            {
                                project.kycStatus === "Approved" &&



                                <span class="absolute badge top-0 right-6"><img src="/assets/Profile_badge.png" width="10%" class="w-24" /></span>}
                        </div>

                        <p className="text-sm text-white mt-5 leading-relaxed">{project.description}</p>

                        <div className="flex !mt-3 justify-between items-center">

                            <div className="social-icons flex gap-4">
                                {project?.twitterLink?.trim() && (
                                    <Link href={project.twitterLink} className="theme-color">
                                        <XIcon />
                                    </Link>
                                )}

                                {project?.telegramLink?.trim() && (
                                    <Link href={project.telegramLink} className="theme-color">
                                        <TelegramIcon />
                                    </Link>
                                )}

                                {project?.websiteLink?.trim() && (
                                    <Link href={project.websiteLink} className="theme-color">
                                        <LanguageIcon />
                                    </Link>
                                )}

                                {project?.mediumLink?.trim() && (
                                    <Link href={project.mediumLink} className="theme-color">
                                        <ScatterPlotIcon />
                                    </Link>
                                )}

                                {project?.discordLink?.trim() && (
                                    <Link href={project.discordLink} className="theme-color">
                                        <SportsEsportsIcon />
                                    </Link>
                                )}
                            </div>

                            <div className="text-sm text-gray-600">

                                {project.kycStatus !== "NotDetected" &&
                                    <p>
                                        <span className="font-medium text-white">KYC date:</span> <span className="theme-color font-medium">{format(new Date(project.kycDate), "MMMM do yyyy")}</span>
                                    </p>}
                            </div>

                        </div>


                        <ProjectTab project={project} />
                    </div>
                </div>
            </div>
        </>
    );
}
