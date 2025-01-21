import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Grid } from "@mui/system";
import CertificateModal from "../modal/CertificateModal";
import CountryTier from "../modal/CountryTier";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TelegramIcon from "@mui/icons-material/Telegram";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function KycAccordion({ project }) {
    console.log("project={project}", project?.kycCertificate);
    const [expanded, setExpanded] = React.useState(0); // Start with the first accordion open

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <Grid item xs={12} className="verified-text">
                {project?.verifiyMembersList?.length > 1 ? (
                    <Typography component="span" className="text-white">
                        <strong className="theme-color text-sm font-extrabold">{project?.verifiyMembersList?.length}</strong> Team Members Verified
                    </Typography>
                ) : (
                    <Typography component="span" className="text-white">
                        <strong className="theme-color text-sm font-extrabold ">{project?.verifiyMembersList?.length}</strong>  {project.verifiyMembersList.length} Team Member Verified
                    </Typography>
                )}{" "}
            </Grid>
            {project?.verifiyMembersList?.length > 0 &&
                project.verifiyMembersList.map((verifiy, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === index}
                        onChange={handleAccordionChange(index)}
                        className="theme-bg grey-border border !rounded-md !my-2"
                    >
                        <AccordionSummary
                            className="grey-border !border-b !border-solid !min-h-px accordian-header !p-3"
                            expandIcon={<FontAwesomeIcon icon={faCaretDown} />}
                            aria-controls={`panel${index}-content`}
                        //id={`panel${index}-header`}
                        >
                            <Grid container spacing={2} className="!gap-2 items-center">
                                <img src="/assets/verified-beg.png" className="w-8"></img>
                                <Grid>
                                    <Grid item xs={6}>
                                        <Typography
                                            component="span"
                                            className="theme-color !text-lg !leading-6 block"
                                        >
                                            {verifiy.name ? verifiy.name : "N/A"}
                                            {project?.kycStatus === "Approved" && (
                                                <FontAwesomeIcon
                                                    className="text-lime-500"
                                                    icon={faCircleCheck}
                                                />
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} className="w-full">
                                        <Typography
                                            component="span"
                                            className="text-white !text-sm !leading-4 !block designation"
                                        >
                                            {verifiy.role ? verifiy.role : "N/A"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </AccordionSummary>

                        <AccordionDetails className="grey-border !border-b !border-solid !pl-3 !py-2 !pr-2 accordian-list">
                            <Typography
                                variant="body2"
                                className="text-white flex justify-between !text-sm !leading-4 items-center"
                            >
                                <strong className="font-normal tracking-normal whitespace-nowrap">Control Over:</strong>
                                <div className="gap-2 flex control-over-span">
                                    {verifiy?.controlOver ? verifiy?.controlOver?.map((item, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-white rounded light-purple text-sm tracking-normal"
                                        >
                                            {item}
                                        </span>
                                    )) : <span className="px-2 py-1 text-white rounded light-purple text-sm">No Access</span>}
                                </div>
                            </Typography>
                        </AccordionDetails>

                        <AccordionDetails className="grey-border !border-b !border-solid !pl-3 !py-2 !pr-2 accordian-list">
                            <Typography
                                variant="body2"
                                className="text-white flex justify-between !text-sm !leading-4"
                            >
                                <div className="flex items-center gap-1 country-tier">
                                    <strong className="font-normal tracking-normal whitespace-nowrap">Country Tier:</strong>
                                    <CountryTier />
                                </div>
                                <div className="font-bold flex items-center">
                                    {" "}
                                    <img
                                        src="/assets/Country_tier_icon.png"
                                        alt="country_tier"
                                        width="24px"
                                    />
                                    {verifiy.countryTier && verifiy.countryTier}
                                </div>
                            </Typography>
                        </AccordionDetails>

                        <AccordionDetails className="!pl-3 !py-2 !pr-2 accordian-list">
                            <Typography
                                variant="body2"
                                className="text-white flex justify-between items-center"
                            >
                                <strong className="font-normal tracking-normal whitespace-nowrap">Socials:</strong>{" "}
                                {(() => {
                                    const socials = [];


                                    if (
                                        verifiy?.telegramHandle &&
                                        verifiy.telegramHandle.trim() !== "N/A"
                                    ) {
                                        let telegramLink = verifiy?.telegram?.startsWith("https://")
                                            ? verifiy.telegram
                                            : `https://${verifiy.telegram}`;

                                        // Ensure '@' is included after 't.me/'
                                        if (
                                            telegramLink.includes("t.me/") &&
                                            !telegramLink.includes("@")
                                        ) {
                                            const parts = telegramLink.split("t.me/");
                                            telegramLink = `${parts[0]}t.me/@${parts[1]}`;
                                        }

                                        socials.push(
                                            <Link
                                                href={telegramLink}
                                                key="telegram"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="theme-color"
                                            >
                                                <FontAwesomeIcon
                                                    className="text-xl text-xl"
                                                    icon={faTelegram}
                                                />
                                            </Link>
                                        );
                                    }

                                    // Discord condition
                                    if (verifiy?.discord && verifiy?.discordHandle) {
                                        socials.push(
                                            <Link
                                                className="theme-color text-xl"
                                                href={verifiy.discord}
                                                key="discord"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FontAwesomeIcon icon={faDiscord} />
                                            </Link>
                                        );
                                    }

                                    // Twitter condition
                                    if (verifiy?.twitterLink) {
                                        socials.push(
                                            <Link
                                                className="theme-color text-xl"
                                                href={verifiy.twitterLink}
                                                key="twitter"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FontAwesomeIcon icon={faXTwitter} />
                                            </Link>
                                        );
                                    }

                                    // Check if socials are available
                                    return socials.length > 0
                                        ? socials.map((social, idx) => (
                                            <span key={idx}>
                                                {social}
                                                {idx < socials.length - 1 && " | "}
                                            </span>
                                        ))
                                        : "No socials available";
                                })()}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
        </>
    );
}
