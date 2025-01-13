import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Grid } from '@mui/system';

export default function ProjectAccordion2({ project }) {
    console.log("project={project}", project);

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
                                    <strong>Contract Address: {report.contractAddress}</strong>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Description:</strong> {report.auditDescription}
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
                                    {report.initialAuditReport && (
                                        report.initialAuditReport.map((audit, idx) => (<>
                                            <div key={audit.url}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => window.open(audit.url, '_blank')}
                                                >
                                                    {idx + 1} Initial Report
                                                </Button>
                                            </div>
                                        </>))
                                    )}
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                {report.finalAuditReport && report.finalAuditReport.map((final, idx) => (<>
                                    <div key={final.url}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => window.open(final.url, '_blank')}
                                        >
                                            Final Report
                                        </Button>
                                    </div>
                                </>))}


                            </AccordionDetails>
                        </Accordion>
                    );
                })}
        </div >
    );
}
