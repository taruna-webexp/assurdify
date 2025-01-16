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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function KycAccordion({ project }) {
    console.log("project={project}", project?.kycCertificate);

    return (
        <>
            <Grid item xs={12} className="verified-text">
                {project?.verifiyMembersList?.length > 0 ?
                    <Typography component="span" className='text-white'>{project.verifiyMembersList.length} Team Members Verified</Typography> :
                    <Typography component="span" className='text-white'>{project.verifiyMembersList} Team Member Verified</Typography>

                }   </Grid>
            {project?.verifiyMembersList?.length > 0 && (
                project.verifiyMembersList.map((verifiy, index) => (

                    <Accordion defaultExpanded={index === 0} key={index} className='theme-bg grey-border border !rounded-md !my-2'>
                        <AccordionSummary className='grey-border !border-b !border-solid !min-h-px accordian-header !p-3'
                            expandIcon={<FontAwesomeIcon icon={faCaretDown} />}
                            aria-controls={`panel${index}-content`}
                        //id={`panel${index}-header`}
                        >
                            <Grid container spacing={2} className="!gap-2 items-center" >
                                <img src='/assets/verified-beg.png' className='w-8'></img>
                                <Grid>
                                    <Grid item xs={6}>
                                        <Typography component="span" className='theme-color !text-lg !leading-6 block'>{verifiy.name} {project?.kycStatus === "Approved" && <FontAwesomeIcon className='text-lime-500' icon={faCircleCheck} />}</Typography>
                                    </Grid>
                                    <Grid item xs={6} className="w-full">
                                        <Typography component="span" className='text-white !text-sm !leading-4 !block'>{verifiy.role}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionSummary>

                        <AccordionDetails className='grey-border !border-b !border-solid !p-3'>
                            <Typography variant="body2" className='text-white flex justify-between !text-sm !leading-4 items-center'>
                                <strong className='font-normal'>Control Over:</strong>
                                <div className='gap-2 flex'>
                                    {
                                        verifiy?.controlOver?.map((item, index) => (
                                            <span key={index} className="px-2 py-1 text-white rounded light-purple text-sm">
                                                {item}
                                            </span>
                                        ))
                                    }
                                </div>
                            </Typography>
                        </AccordionDetails>


                        <AccordionDetails className='grey-border !border-b !border-solid !p-3 '>
                            <Typography variant="body2" className='text-white flex justify-between !text-sm !leading-4'>
                                <div className='flex items-center gap-1 country-tier'><strong className='font-normal'>Country Tier:</strong>
                                    <CountryTier /></div>
                                <div className='font-bold flex items-center'>  <img src="/assets/Country_tier_icon.png" alt='country_tier' width="24px" />
                                    {verifiy.countryTier ? verifiy.countryTier : "N/A"
                                    }</div>


                            </Typography>
                        </AccordionDetails>

                        <AccordionDetails className='!p-3'>
                            <Typography variant="body2" className='text-white flex justify-between items-center'>
                                <strong className='font-normal'>socials:</strong>{' '}
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
                                                className='theme-color'
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

                    </Accordion>
                ))
            )}

        </>
    );
}
