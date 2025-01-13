import React from "react";
import { Grid, Card, CardHeader, CardContent, Typography, Avatar, Button, CardActions } from "@mui/material";
import { red } from "@mui/material/colors";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Link from "next/link";

export default function ProjectCards({ data }) {
    return (
        <Grid container spacing={4} maxWidth="lg" className="projectForm !px-4 md:px-8">
            {data.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.projectName}>
                    <Link href={`/project/${project.projectName.split(' ').join('-').toLowerCase()}`}>
                        <Card sx={{ maxWidth: 345 }}>

                            <CardHeader
                                avatar={
                                    <Avatar
                                        sx={{ bgcolor: red[500] }}
                                        src={project.images?.[0]?.url}
                                        aria-label="project"
                                    >
                                        {project.projectName[0]}
                                    </Avatar>
                                }
                                title={
                                    <>
                                        {`${project.projectName} - ${project?.verifiedMembers?.length > 0 ? project?.verifiedMembers?.length : ""
                                            } `}
                                        {project.kycStatus === "Approved" ?
                                            <img src="/assets/verified-beg.png" alt="Verified Badge" />
                                            : (
                                                project.auditStatus === "NotDetected" && project.kycStatus === "Rejected" ? <img src="/assets/rejected-image.png" width="40%" alt="Verified Badge" /> : ""
                                            )

                                        }
                                    </>
                                }

                                subheader={
                                    <>
                                        {`${project.lowerCaseTickerName ? project.lowerCaseTickerName.toUpperCase() : ""} `}
                                        {project.kycStatus === "Approved" ? (
                                            "KYC"
                                        ) : project.auditStatus === "NotDetected" && project.kycStatus === "Rejected" ? (
                                            ""
                                        ) : (
                                            <>
                                                <WarningAmberIcon className="text-red-500" />
                                                <span className="text-red-500">No KYC</span>
                                            </>
                                        )}

                                    </>
                                }
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {project.description?.substring(0, 150)}...
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography variant="body2" color="text.secondary">
                                    {project.kycDate}
                                </Typography>
                                {project.auditStatus === "Completed" ?
                                    <Typography className="text-green-500" variant="body2">Audited</Typography> :
                                    project.auditStatus === "NotDetected" && project.kycStatus === "Rejected" ? "" :


                                        <Typography className="text-red-500" variant="body2" >Not Audited</Typography>
                                }
                            </CardActions>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}
