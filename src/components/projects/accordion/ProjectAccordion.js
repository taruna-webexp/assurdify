import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Grid } from '@mui/system';
import CertificateModal from '../modal/CertificateModal';
import CountryTier from '../modal/CountryTier';

export default function ProjectAccordion({ project }) {
    console.log("project={project}", project);

    return (
        <div>
            {/* Iterate through verifyMembersList if available */}
            {project?.verifiyMembersList?.length > 0 && (project.verifiyMembersList.map((verifiy, index) => {
                console.log("verifiyM", index);
                return (
                    <>
                        <Accordion defaultExpanded={index === 0} key={verifiy.bubbleUserId}>
                            <AccordionSummary

                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <div className='grid'>
                                    <Typography component="span">{verifiy.name}</Typography>
                                    <Typography component="span">{verifiy.role}</Typography>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>

                                <Typography variant="body2">
                                    <strong>Socials:</strong> <a href={`https://${verifiy.telegram}`} target="_blank" rel="noopener noreferrer">{verifiy.telegram}</a>
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    <strong>Country Tier:</strong> {verifiy.countryTier} <CountryTier />
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <Typography variant="body2">
                                    <strong>Control Over:</strong> {verifiy.controlOver.join(", ")}
                                </Typography>
                            </AccordionDetails>
                            <AccordionDetails>
                                <CertificateModal img={project.kycCertificate} />
                            </AccordionDetails>
                        </Accordion>
                    </>
                );
            }))

            }



        </div>
    );
}
