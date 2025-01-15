"use client"
import projectService from '@/services/projectService'
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { formatProjectName } from '../utility/FormatUrl'

export default function UpperSection() {
    const [featureData, setFeatureData] = useState([])
    const fetchFeatureData = async () => {
        try {
            const response = await projectService.getFeatureProject({
                pageSize: 18,
                featured: "Yes"
            })
            setFeatureData(response.records)

        } catch (error) {

        }
    }
    useEffect(() => {
        fetchFeatureData()
    }, [])
    return (
        <div>
            <div className='container max-w-screen-lg mx-auto'>
                <div className='text-center pt-14 mb-16'>
                    <h2 className='text-5xl leading-tight text-gradient mb-5'>Assure DeFi<br /> Verified Projects</h2>
                    <p className='text-lg leading-6 font-light mb-8'>Our network of verified projects boasts some of<br /> the Web3 industry’s top talent with a combined<br /> market cap of $1.6 Billion</p>
                    <Link href="#" className='gradient-bg py-5 px-28 theme-border rounded-md inline-block font-semibold'>GET YOUR PROJECT LISTED</Link>
                </div>
                <div className='theme-border rounded-xl featured-project px-6 pb-6 pt-4 mb-6'>
                    <h3 className='text-center text-gradient text-3xl leading-10 mb-5'>Featured</h3>

                    <Grid container maxWidth="lg" className="projectForm !p-0 md:px-8 gap-6 !flex-nowrap">
                        {featureData.length > 0 && featureData.map((project) => (
                            <Grid item xs={12} sm={6} md={6} key={project.projectName}>
                                <Link href={`/project/${formatProjectName(project.projectName)}`}>
                                    <Card className='theme-border gradient-bg-sharp'>


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

                                        {/* <CardHeader className='text-white'
                                            avatar={
                                                <Avatar

                                                    src={project.images?.[0]?.url}
                                                    aria-label="project"
                                                >
                                                    {project.projectName[0]}
                                                </Avatar>
                                            }
                                            title={
                                                <>
                                                    <span>{`${project.projectName}  `}</span>

                                                    <span>{project?.verifiedMembers?.length > 0 ? project?.verifiedMembers?.length : ""
                                                        }
                                                    {project.kycStatus === "Approved" ?
                                                        <img src="/assets/verified-beg.png" alt="Verified Badge" />
                                                        : (
                                                            project.auditStatus === "NotDetected" && project.kycStatus === "Rejected" ? <img src="/assets/rejected-image.png" width="40%" alt="Verified Badge" /> : ""
                                                        )
                                                    }
                                                    </span>
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
                                            <Typography variant="body2" className='text-white'>
                                                {project.description?.substring(0, 260)}...
                                            </Typography>
                                        </CardContent>
                                        <CardActions className='!p-3 light-purple flex justify-between'>
                                            <Typography variant="body2" className='text-white !font-medium'>
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

                </div>
            </div>

        </div>
    )
}
