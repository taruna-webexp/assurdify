import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { BadgeImage } from "./BadgeImage";
import { AuditStatusBadge } from "@/components/projects/AuditStatusBadge";
import Image from "next/image";
export default function ProjectCards({ data }) {
  return (
    <Grid
      container
      spacing={4}
      className="projectForm !px-0 md:px-8 max-w-screen-lg container !w-full projects-list-cont"
    >
      {data.map((project) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={project.projectName}
          className="!p-0 collunm"
        >
          <Link
            href={
              project.auditStatus === "NotDetected" &&
              project.kycStatus === "Rejected"
                ? "#"
                : `/project/${encodeURIComponent(project.seoSlug)}`
            }
            title={project.seoSlug}
          >
            <Card className="light-yellow-border theme-bg">
              <div className="flex justify-between p-3">
                <div className="flex items-center gap-1.5 card-top-title">
                  <Image
                    width={45}
                    height={45}
                    priority
                    alt="project images"
                    src={
                      project.images
                        ? project.images?.[0]?.thumbnails?.small?.url
                        : "/assets/no-image-available.png"
                    }
                    className="w-10 rounded-full h-10 object-cover border-2"
                  />

                  <div>
                    <h6 className=" projectName text-white font-extrabold  ">
                      {project.projectName}{" "}
                    </h6>
                    <div className="flex gap-2">
                      <span className="grey-color text-xs block">
                        {`${
                          project.lowerCaseTickerName
                            ? project.lowerCaseTickerName.toUpperCase()
                            : ""
                        } `}
                      </span>
                      {/* kyc Status text */}
                      <span className="text-slate-300 text-xs block flex gap-1 font-bold">
                        {project.kycStatus === "Approved" ? (
                          "KYC"
                        ) : project.auditStatus === "NotDetected" ||
                          (project.auditStatus === "Completed" &&
                            project.kycStatus === "Rejected") ? (
                          ""
                        ) : (
                          <>
                            <FontAwesomeIcon
                              className=" !text-sm text-red-600 font-semibold"
                              icon={faTriangleExclamation}
                            />
                            <span className="text-red-600 font-bold">
                              No KYC
                            </span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                {/* verified img or rejected */}
                <div className="flex items-center justify-end gap-1.5 card-top-badge relative">
                  <BadgeImage
                    kycStatus={project?.kycStatus}
                    auditStatus={project?.auditStatus}
                  />
                  <span className="font-bold text-white">
                    {project?.verifiedMembers?.length > 0
                      ? project?.verifiedMembers?.length
                      : ""}
                  </span>
                </div>
              </div>
              <CardContent className="!px-3 !pb-3 !pt-0">
                <Typography
                  variant="body2"
                  className="text-white overflow-hidden project-text"
                >
                  {project.description && (
                    <>
                      {project.description.length > 150
                        ? `${project.description.substring(0, 150)}...`
                        : project.description}
                    </>
                  )}
                </Typography>
              </CardContent>
              <CardActions className="!p-3 light-purple flex justify-between">
                <Typography variant="body2" className="text-white">
                  {project.kycDate}
                </Typography>
                {/*  AuditStatus  */}
                <AuditStatusBadge
                  auditStatus={project.auditStatus}
                  kycStatus={project.kycStatus}
                />
              </CardActions>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
