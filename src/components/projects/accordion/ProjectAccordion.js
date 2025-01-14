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
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TelegramIcon from '@mui/icons-material/Telegram';

export default function ProjectAccordion({ project }) {
    console.log("project={project}", project?.kycCertificate);

    return (
        <>
            {project?.verifiyMembersList?.length > 0 && (
                project.verifiyMembersList.map((verifiy, index) => (
                    <Accordion defaultExpanded={index === 0} key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    {project?.verifiyMembersList?.length > 0 ?
                                        <Typography component="span">{project.verifiyMembersList.length} Team Members Verified</Typography> :
                                        <Typography component="span">{project.verifiyMembersList} Team Member Verified</Typography>

                                    }   </Grid>
                                <Grid item xs={6}>
                                    <Typography component="span">{verifiy.name}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography component="span">{verifiy.role}</Typography>
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body2">
                                <strong>Socials:</strong>{' '}
                                {(() => {
                                    const socials = [];

                                    // Telegram condition
                                    if (verifiy?.telegramHandle && verifiy.telegramHandle.trim() !== 'N/A') {
                                        let telegramLink = verifiy?.telegram?.startsWith('https://')
                                            ? verifiy.telegram
                                            : `https://${verifiy.telegram}`;

                                        // Ensure '@' is included after 't.me/'
                                        if (telegramLink.includes('t.me/') && !telegramLink.includes('@')) {
                                            const parts = telegramLink.split('t.me/');
                                            telegramLink = `${parts[0]}t.me/@${parts[1]}`;
                                        }

                                        socials.push(
                                            <Link
                                                href={telegramLink}
                                                key="telegram"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <TelegramIcon />
                                            </Link>
                                        );
                                    }

                                    // Discord condition
                                    if (verifiy?.discord && verifiy?.discordHandle) {
                                        socials.push(
                                            <Link
                                                href={verifiy.discord}
                                                key="discord"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <i className="fab fa-discord"></i> Discord
                                            </Link>
                                        );
                                    }

                                    // Twitter condition
                                    if (verifiy?.twitterLink) {
                                        socials.push(
                                            <Link
                                                href={verifiy.twitterLink}
                                                key="twitter"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <TelegramIcon />
                                            </Link>
                                        );
                                    }

                                    // Check if socials are available
                                    return socials.length > 0
                                        ? socials.map((social, idx) => (
                                            <span key={idx}>
                                                {social}
                                                {idx < socials.length - 1 && ' | '}
                                            </span>
                                        ))
                                        : 'No social link available';
                                })()}
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography variant="body2">
                                <strong>Country Tier:</strong> {verifiy.countryTier} <CountryTier />
                                <LocationOnIcon /> N/A
                            </Typography>
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography variant="body2">
                                <strong>Control Over:</strong> {verifiy.controlOver.join(", ")}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
            <div>
                {project?.kycCertificate && (
                    <CertificateModal img={project.kycCertificate} />
                )}
                {project?.nftUrl && (
                    <Link href={project.nftUrl} passHref>
                        <Button variant="contained">NFT</Button>
                    </Link>
                )}
            </div>
        </>
    );
}
