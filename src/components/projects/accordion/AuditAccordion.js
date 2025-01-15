"use client";

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import { BlockChainImages, blockchainNames } from '../BlockChainImages';


export default function AuditAccordion({ project }) {
    const [copied, setCopied] = React.useState(false);

    const copyHandler = async (contractAddresses) => {
        await navigator.clipboard.writeText(contractAddresses.join(", "));
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    }

    return (
        <div>
            {/* Iterate through auditReportList if available */}
            {project.auditReportList?.length > 0 &&
                project.auditReportList.map((report, index) => {
                    return (
                        <Accordion defaultExpanded key={report.contractAddress}>
                            <AccordionSummary
                                // expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <div className="grid">
                                    <Typography component="span">{`Audit Score: ${report.auditScore}/100`}</Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    <strong>
                                        Contract Address: {report.contractAddress !== "N/A" ? report.contractAddress : "Contract address N/A at time of verification"}
                                        {copied ? "Copied!" : <ContentCopyIcon onClick={() => copyHandler([report.contractAddress !== "N/A" ? report.contractAddress : "Contract address N/A at time of verification"])} />}
                                    </strong>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Ecosystem:</strong>
                                    {/* Dynamically display blockchain image based on ecosystem */}
                                    {project?.blockchain?.length > 0 && BlockChainImages[project.blockchain[0]] && (
                                        <>
                                            <img
                                                src={BlockChainImages[project.blockchain[0]]}
                                                alt={project.blockchain[0]}
                                                width="4%"
                                            />
                                            {blockchainNames[project.blockchain[0]] || project.blockchain[0]}
                                        </>
                                    )}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Description:</strong> {report.auditDescription ? report.auditDescription : "-------"}
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    <strong>Github:</strong>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => window.open(report.githubReportLink, '_blank')}
                                    >
                                        View Report
                                    </Button>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Initial Reports:</strong>
                                    {report.initialAuditReport && report.initialAuditReport.map((audit, idx) => (
                                        <div key={audit.url}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => window.open(audit.url, '_blank')}
                                            >
                                                {idx + 1} Initial Report
                                            </Button>
                                        </div>
                                    ))}
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                {report.finalAuditReport && report.finalAuditReport.map((final, idx) => (
                                    <div key={final.url}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => window.open(final.url, '_blank')}
                                        >
                                            Final Report
                                        </Button>
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
        </div >
    );
}
