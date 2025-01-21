import React from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Link from "next/link";

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
                                : `/project/${project.seoSlug}`
                        }
                    >
                        <Card className="light-yellow-border theme-bg">
                            <div className="flex justify-between p-3">
                                <div className="flex items-center gap-1.5">
                                    {project.images ? (
                                        <img
                                            src={project.images?.[0]?.url}
                                            className="w-10 rounded-full h-10 object-cover border-2"
                                        />
                                    ) : (
                                        <img
                                            src="/assets/no-image-available.png"
                                            alt="no-image-available"
                                            className="w-10 rounded-full h-10 object-cover  border-2"
                                        ></img>
                                    )}

                                    <div>
                                        <h6 className="text-white font-extrabold ">
                                            {project.projectName}{" "}
                                        </h6>
                                        <div className="flex gap-2">
                                            <span className="grey-color text-xs block">
                                                {`${project.lowerCaseTickerName
                                                    ? project.lowerCaseTickerName.toUpperCase()
                                                    : ""
                                                    } `}
                                            </span>
                                            <span className="text-slate-300 text-xs block flex gap-1">
                                                {project.kycStatus === "Approved" ? (
                                                    "KYC"
                                                ) : project.auditStatus === "NotDetected" ||
                                                    (project.auditStatus === "Completed" &&
                                                        project.kycStatus === "Rejected") ? (
                                                    ""
                                                ) : (
                                                    <>
                                                        <WarningAmberIcon className=" !text-sm text-red" />
                                                        <span className="text-red">No KYC</span>
                                                    </>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* verified img or rejected */}
                                <div className="flex items-center justify-end gap-1.5">
                                    {project.kycStatus === "Approved" ? (
                                        <img src="/assets/verified-beg.png" alt="Verified Badge" />
                                    ) : project.auditStatus === "NotDetected" &&
                                        project.kycStatus === "Rejected" ? (
                                        <img
                                            src="/assets/rejected-image.png"
                                            className="max-w-20"
                                            alt="Rejected Badge"
                                        />
                                    ) : project.auditStatus === "Completed" &&
                                        project.kycStatus === "Rejected" ? (
                                        <img src="/assets/verified-beg.png" alt="Verified Badge" />
                                    ) : (
                                        ""
                                    )}
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
                                {project.auditStatus === "Completed" &&
                                    project.kycStatus === "Rejected" ? (
                                    ""
                                ) : project.auditStatus === "Completed" ? (
                                    <Typography
                                        className="text-green-500 !font-semibold"
                                        variant="body2"
                                    >
                                        Audited
                                    </Typography>
                                ) : project.auditStatus === "NotDetected" &&
                                    project.kycStatus === "Approved" ? (
                                    <Typography
                                        className="text-red !font-semibold"
                                        variant="body2"
                                    >
                                        Not Audited
                                    </Typography>
                                ) : (
                                    ""
                                )}
                            </CardActions>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}
