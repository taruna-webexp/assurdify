"use client";

import { Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeatailSkeleton from "../skeleton/DeatailSkeleton";
import {
  renderKYCInfo,
  renderSocialLinks,
} from "./varificationdetail/VerificationDetailData";
import ProjectTab from "./tabs/ProjectTab";
import CertificateModal from "./modal/CertificateModal";
import { useProjects } from "@/hooks/useProjects";
import Image from "next/image";

export default function SingleProject({ slug }) {
  const {
    project,
    singleProjecterror,
    isSingleProjectLoading,
    fetchSingleProject,
  } = useProjects();
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDeatailsData = () => {
      fetchSingleProject(slug);
    };
    fetchDeatailsData();
  }, [slug]);

  if (singleProjecterror) {
    return (
      <Grid container justifyContent="center" className="my-5">
        <Typography variant="h6" color="text-white" className="data-not-found">
          {singleProjecterror}
        </Typography>
      </Grid>
    );
  }

  //certificate model open handler
  const handleCertificateModalOpen = () => setCertificateModalOpen(true);

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
          <Image
            width={25}
            height={100}
            src="/assets/typcn_arrow-back.png"
            alt="arrow-back"
            priority
          />{" "}
          Back to projects
        </button>
      </div>
      {isSingleProjectLoading ? (
        <DeatailSkeleton />
      ) : (
        <div className="flex items-center justify-center pb-6 pt-1 bg-transparent card-section">
          <div className="card-container relative m-auto w-full">
            <div className="p-5 single-card bg-cover relative theme-border-light z-10">
              <div className="space-y-6">
                <div className="flex items-center cart-title">
                  <div className="flex single-card-title">
                    <Image
                      width={25}
                      height={100}
                      alt="project images"
                      src={
                        project.images
                          ? project.images[0].thumbnails
                            ? project.images[0].thumbnails.small.url
                            : project.images[0].url
                          : "/assets/no-image-available.png"
                      }
                      priority
                      className="border-4 w-14 h-14 min-w-14 rounded-full"
                    />
                    <div className="pl-3">
                      <h2 className="font-extrabold text-2xl text-white card-heading">
                        {project?.projectName}
                      </h2>
                      <span className="text-lg leading-5 grey-color">
                        {project?.lowerCaseTickerName?.toUpperCase() || ""}
                      </span>
                    </div>
                  </div>
                  {project?.kycCertificate && (
                    <span className="absolute badge top-0 right-6">
                      <Image
                        width={100}
                        height={100}
                        alt="Profile_badge"
                        onClick={handleCertificateModalOpen}
                        src="/assets/Profile_badge.png"
                        className="w-24 cursor-pointer"
                        priority
                      />
                    </span>
                  )}
                </div>

                <p className="text-sm text-white mt-5 leading-relaxed tracking-normal sub-text font-light break-all">
                  {project?.description}
                </p>

                <div className="flex justify-between items-center social-date mt-3">
                  <div className="social-icons flex gap-2">
                    {renderSocialLinks(project)}
                  </div>
                  <div className="text-sm text-gray-600 date">
                    {renderKYCInfo(project)}
                  </div>
                </div>

                <ProjectTab project={project} />
              </div>
            </div>
          </div>
        </div>
      )}
      {certificateModalOpen && (
        <CertificateModal
          img={project.kycCertificate}
          buttonText=""
          open={certificateModalOpen}
          setOpen={setCertificateModalOpen}
        />
      )}
    </>
  );
}
