"use client";

import * as React from 'react';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import { BlockChainImages, blockchainNames } from '../BlockChainImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faDownload, faCopy } from '@fortawesome/free-solid-svg-icons';
export default function AuditAccordion({ project }) {
    const [copiedIndex, setCopiedIndex] = React.useState(null);
    const [copied, setCopied] = React.useState(false);
    //COPY CONTRACTADRESS
    const copyHandler = async (contractAddresses, index) => {
        console.log("idx", index);
        await navigator.clipboard.writeText(contractAddresses.join(", "));
        setCopiedIndex(index);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }

    return (
        <div className='max-h-96 overflow-auto custom-scroll flex flex-col gap-2.5'>
            {project.auditReportList?.length > 0 ?
                project.auditReportList.map((report, index) => {
                    return (<>
                        <div className='border px-3 pt-3 rounded-md grey-border dark-purple-bg'>
                            <div className='flex justify-between text-sm items-center mb-2'>
                                <span>Audit Score: <strong className='text-lime-500'>{report.auditScore}/100</strong></span>

                            </div>
                            <div className='grey-border border p-3 rounded-lg mb-2'>
                                <Typography variant="body2">
                                    <strong className='text-sm font-normal'>
                                        Contract Address:
                                        <div className="light-purple p-3 flex justify-between items-center copy-icon rounded-md mt-2 theme-color text-sm overflow-hidden">
                                            <span className="break-all flex-1">
                                                {project.contractAddress || report.contractAddress}
                                            </span>

                                            {copiedIndex === index ? (
                                                <span className="text-white">Copied!</span>
                                            ) : (
                                                <img
                                                    src="/assets/solar_copy-bold.png"
                                                    alt="copy-bold.png"
                                                    onClick={() =>
                                                        copyHandler(
                                                            [project.contractAddress || report.contractAddress],
                                                            index
                                                        )
                                                    }
                                                />
                                            )}
                                        </div>

                                    </strong>
                                </Typography>
                            </div>
                            <div className='grey-border border p-3 rounded-lg mb-2'>
                                <Typography variant="body2" className='flex justify-between items-center'>
                                    <strong className='text-sm font-normal'>Ecosystem:</strong>
                                    {/* Dynamically display blockchain image based on ecosystem */}
                                    {project?.blockchain?.length > 0 && BlockChainImages[project.blockchain[0]] && (
                                        <>
                                            <div className='flex items-center justify-end gap-2'>
                                                <img
                                                    src={BlockChainImages[project.blockchain[0]]}
                                                    alt={project.blockchain[0]}
                                                    className='w-5'
                                                />
                                                {blockchainNames[project.blockchain[0]] || project.blockchain[0]}
                                            </div>
                                        </>
                                    )}
                                </Typography>
                            </div>
                            <div className='grey-border border p-3 rounded-lg mb-2'>
                                <Typography variant="body2" className='flex justify-between items-center'>
                                    <strong className='text-sm font-normal'>Description:</strong>
                                    <span className='italic grey-color'>{report.auditDescription ? report.auditDescription : "-------"}</span>
                                </Typography>
                            </div>
                            <div className='flex mb-3 gap-2 report-buttons flex-wrap'>

                                {/* <strong>Github:</strong> */}
                                <div>
                                    <Button

                                        variant="contained"
                                        color="primary"
                                        onClick={() => window.open(report.githubReportLink, '_blank')}
                                    >
                                        <FontAwesomeIcon icon={faLink} /> GitHub
                                    </Button>
                                </div>


                                {/* <strong>Initial Reports:</strong> */}
                                {report.initialAuditReport && report.initialAuditReport.map((audit, idx) => (
                                    <div key={audit.url}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => window.open(audit.url, '_blank')}
                                        >
                                            <FontAwesomeIcon icon={faDownload} />{idx + 1}Initial Report
                                        </Button>
                                    </div>
                                ))}

                                {report.finalAuditReport && report.finalAuditReport.map((final, idx) => (
                                    <div key={final.url}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => window.open(final.url, '_blank')}
                                        >
                                            <FontAwesomeIcon icon={faDownload} />Final Report
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>)
                }) : <Typography className=' py-12 text-center text-red-600'>No Audit record found</Typography>}



        </div >
    );
}
