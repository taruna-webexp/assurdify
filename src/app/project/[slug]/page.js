"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircularLoader from "@/components/loader/CircularLoader";
import ProjectTab from "@/components/projects/tabs/ProjectTab";
import CertificateModal from "@/components/projects/modal/CertificateModal";
import projectService from "@/services/projectService";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faMedium, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function SingleProject({ params }) {
    const { slug } = use(params);
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await projectService.getSingleProject({ slug });
                response ? setProject(response) : setError("NO RECORD FOUND");
            } catch (err) {
                console.error("Error fetching project data:", err);
                setError("NO RECORD FOUND");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProject();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <CircularLoader />
            </div>
        );
    }
    if (error) {
        return (
            <Grid container justifyContent="center" className="my-5">
                <Typography variant="h6" color="text-white" className="data-not-found">
                    {error}
                </Typography>
            </Grid>
        );
    }

    const handleCertificateModalOpen = () => setModalOpen(true);

    // social links
    const renderSocialLinks = () => {
        const socialLinks = [
            { link: project?.websiteLink, icon: faGlobe },
            { link: project?.twitterLink, icon: faXTwitter },
            { link: project?.telegramLink, icon: faTelegram },
            { link: project?.mediumLink, icon: faMedium },
            { link: project?.discordLink, icon: faDiscord },
        ];

        return socialLinks.map(
            ({ link, icon }, idx) =>
                link && link !== "N/A" && link.trim() !== "" && (  // Added check for empty string
                    <Link key={idx} href={link} className="theme-color" target="_blank">
                        <FontAwesomeIcon icon={icon} />
                    </Link>
                )
        );
    };

    //kyc info
    const renderKYCInfo = () => {
        if (project.auditDate) {
            return (
                <p>
                    <span className="font-medium text-white">Audit date:</span>&nbsp;
                    <span className="theme-color font-medium">
                        {format(new Date(project.auditDate), "MMMM do yyyy")}
                    </span>
                </p>
            );
        }
        else if (project.kycStatus === "Approved") {
            return (
                <p>
                    <span className="font-medium text-white">KYC date:</span> &nbsp;
                    <span className="theme-color font-medium">
                        {format(new Date(project.kycDate), "MMMM do yyyy")}
                    </span>
                </p>
            );
        }

        return null;
    };

    return (
        <>
            <h2 className="text-gradient text-5xl text-center mb-4 mt-11 card-main-heading">
                Verification Details
            </h2>
            <div className="text-center mb-6">
                <button
                    onClick={() => router.push("/")}
                    className="w-full flex justify-center text-base text-white items-center gap-1.5"
                >
                    <img src="/assets/typcn_arrow-back.png" alt="arrow-back" /> Back to
                    projects
                </button>
            </div>
            <div className="flex items-center justify-center py-6 bg-transparent card-section">
                <div className="card-container relative m-auto w-full">
                    <div className="p-5 single-card bg-cover relative theme-border-light z-10">
                        <div className="space-y-6">
                            <div className="flex items-center cart-title">
                                <img
                                    src={
                                        project?.images?.[0]?.url ||
                                        "/assets/no-image-available.png"
                                    }
                                    width="10%"
                                    className="border-4 w-14 h-14 rounded-full"
                                />
                                <div className="pl-3">
                                    <h2 className="font-extrabold text-2xl text-white card-heading">
                                        {project.projectName}
                                    </h2>
                                    <span className="text-lg leading-5 grey-color">
                                        {project.lowerCaseTickerName?.toUpperCase() || ""}
                                    </span>
                                </div>
                                {project.kycStatus === "Approved" && (
                                    <span className="absolute badge top-0 right-6">
                                        <img
                                            onClick={handleCertificateModalOpen}
                                            src="/assets/Profile_badge.png"
                                            width="10%"
                                            className="w-24 cursor-pointer"
                                        />
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-white mt-5 leading-relaxed tracking-normal sub-text font-light">
                                {project.description}
                            </p>

                            <div className="flex justify-between items-center social-date mt-3">
                                <div className="social-icons flex gap-2">
                                    {renderSocialLinks()}
                                </div>
                                <div className="text-sm text-gray-600 date">
                                    {renderKYCInfo()}
                                </div>
                            </div>

                            <ProjectTab project={project} />
                        </div>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <CertificateModal
                    img={project.kycCertificate}
                    buttonText=""
                    open={modalOpen}
                    setOpen={setModalOpen}
                />
            )}
        </>
    );
}
