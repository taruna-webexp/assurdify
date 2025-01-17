"use client";
import LayoutHeader from "@/app/layoutHeader";
import ProjectTab from "@/components/projects/tabs/ProjectTab";
import projectService from "@/services/projectService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { use } from "react";
import Link from "next/link";
import CircularLoader from "@/components/loader/CircularLoader";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDiscord,
    faMedium,
    faTelegram,
    faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import CertificateModal from "@/components/projects/modal/CertificateModal";
CircularLoader;
export default function SingleProject({ params }) {
    const { slug } = use(params); //
    const [project, setProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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
    const handleCertificateModalOpen = () => {
        setModalOpen(true);
    };
    return (
        <>
            <h2 className="text-gradient text-5xl text-center mb-4">
                Verification Details
            </h2>
            <div className="text-center">
                <button
                    onClick={() => router.push("/")}
                    className="w-full flex justify-center text-sm text-white items-center gap-1.5"
                >
                    {" "}
                    <img src="/assets/typcn_arrow-back.png" alt="arrow-back" /> Back to
                    projects
                </button>
            </div>
            <div className="flex items-center justify-center bg-gray-100 py-6 bg-transparent">
                <div className="card-container relative m-auto w-full">
                    <div className="p-6 single-card bg-cover relative theme-border-light z-10">
                        <div className="space-y-6">
                            <div className="flex">
                                {project?.images ? (
                                    <img
                                        src={project?.images[0]?.url}
                                        width="10%"
                                        className="border-4 w-14 h-14 rounded-full"
                                    />
                                ) : (
                                    <img
                                        src="/assets/no-image-available.png"
                                        width="10%"
                                        className="border-4 w-14 h-14 rounded-full"
                                    />
                                )}
                                <div className="pl-3">
                                    <h2 className="font-extrabold text-3xl text-white">
                                        {project.projectName}
                                    </h2>

                                    <span className="text-lg leading-5 grey-color">
                                        {project.lowerCaseTickerName
                                            ? project.lowerCaseTickerName.toUpperCase()
                                            : ""}
                                    </span>
                                </div>
                                {project.kycStatus === "Approved" && (
                                    <span className="absolute badge top-0 right-6" >
                                        <img
                                            onClick={handleCertificateModalOpen}
                                            src="/assets/Profile_badge.png"
                                            width="10%"
                                            className="w-24 cursor-pointer"

                                        />
                                    </span>
                                )}
                            </div>

                            <p className="text-sm text-white mt-5 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex !mt-3 justify-between items-center">
                                <div className="social-icons flex gap-2">
                                    {project?.websiteLink && project.websiteLink !== "N/A" && (
                                        <Link href={project.websiteLink} className="theme-color">
                                            <FontAwesomeIcon icon={faGlobe} />
                                        </Link>
                                    )}
                                    {project?.twitterLink && project.twitterLink !== "N/A" && (
                                        <Link href={project.twitterLink} className="theme-color">
                                            <FontAwesomeIcon icon={faXTwitter} />
                                        </Link>
                                    )}
                                    {project?.telegramLink && project.telegramLink !== "N/A" && (
                                        <Link href={project.telegramLink} className="theme-color">
                                            <FontAwesomeIcon icon={faTelegram} />
                                        </Link>
                                    )}
                                    {project?.mediumLink && project.mediumLink !== "N/A" && (
                                        <Link href={project.mediumLink} className="theme-color">
                                            <FontAwesomeIcon icon={faMedium} />
                                        </Link>
                                    )}
                                </div>


                                <div className="text-sm text-gray-600">
                                    {project.kycStatus && project.kycStatus === "Approved" ? (
                                        <p>
                                            <span className="font-medium text-white">KYC date:</span>{" "}
                                            <span className="theme-color font-medium">
                                                {format(new Date(project.kycDate), "MMMM do yyyy")}
                                            </span>
                                        </p>
                                    ) : project.auditDate && project.kycStatus === "Rejected" ? (
                                        <p>
                                            <span className="font-medium text-white">Audit date:</span>{" "}
                                            <span className="theme-color font-medium">
                                                {format(new Date(project.auditDate), "MMMM do yyyy")}
                                            </span>
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>

                            <ProjectTab project={project} />
                        </div>
                    </div>
                </div>
            </div >
            {modalOpen && (
                <CertificateModal
                    img={project.kycCertificate}
                    buttonText=""
                    open={modalOpen}
                    setOpen={setModalOpen}

                />
            )
            }
        </>
    );
}
