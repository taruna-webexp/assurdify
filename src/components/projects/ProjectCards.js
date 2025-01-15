import React from "react";
import { Grid, Card, CardHeader, CardContent, Typography, Avatar, Button, CardActions } from "@mui/material";
import { red } from "@mui/material/colors";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Link from "next/link";

export default function ProjectCards({ data }) {
    return (
        <Grid container spacing={4} className="projectForm !px-0 md:px-8 max-w-screen-lg container !w-full projects-list-cont">
            {data.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.projectName} className="!p-0 collunm">
                    <Link href={`/project/${project.projectName.split(' ').join('-').toLowerCase()}`}>
                        <Card className="light-yellow-border theme-bg">

                        <div className='flex justify-between p-3'>
                            <div className='flex items-center gap-1.5'>
                                <img src={project.images?.[0]?.url} className='w-10 rounded-full '></img>
                                <div><h6 className='text-white font-extrabold '>{project.projectName} </h6> <span className='grey-color text-xs block'>{`${project.lowerCaseTickerName ? project.lowerCaseTickerName.toUpperCase() : ""} `}</span></div>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                {project.kycStatus === "Approved" ?
                                    <img src="/assets/verified-beg.png" alt="Verified Badge" />
                                    : (
                                        project.auditStatus === "NotDetected" && project.kycStatus === "Rejected" ? <img src="/assets/rejected-image.png" width="40%" alt="Verified Badge" /> : ""
                                    )

                                }
                                <span className='font-bold text-white'>{project?.verifiedMembers?.length > 0 ? project?.verifiedMembers?.length : ""}</span>
                            </div>
                        </div>

                        {/* <CardHeader
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
                        /> */}
                            <CardContent className='!px-3 !pb-3 !pt-0'>
                                <Typography variant="body2" className="text-white min-h-20 max-h-20 overflow-hidden">
                                    {project.description?.substring(0, 150)}...
                                </Typography>
                            </CardContent>
                            <CardActions className='!p-3 light-purple flex justify-between'>
                                <Typography variant="body2" className="text-white">
                                    {project.kycDate}
                                </Typography>
                                {project.auditStatus === "Completed" ?
                                    <Typography className="text-green-500 !font-semibold" variant="body2">Audited</Typography> :
                                    project.auditStatus === "NotDetected" && project.kycStatus === "Rejected" ? "" :


                                        <Typography className="text-red-500 !font-semibold" variant="body2" >Not Audited</Typography>
                                }
                            </CardActions>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}
