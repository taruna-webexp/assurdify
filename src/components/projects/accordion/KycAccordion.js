import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/system";
import CountryTier from "../modal/CountryTier";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import SocialLinks from "@/components/Sociallinks/SocialLinks";

export default function KycAccordion({ project }) {
    const [expanded, setExpanded] = useState(0);
    // Accordin handle change
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    //verified text handler
    const renderVerifiedText = () => {
        const count = project?.verifiyMembersList?.length || 0;
        const text = count === 1 ? "Team Member Verified" : "Team Members Verified";
        return (
            <Typography component="span" className="text-white">
                <strong className="theme-color text-sm font-extrabold">{count}</strong> {text}
            </Typography>
        );
    };

    //handle render controlover
    const renderControlOver = (controlOver) =>
        controlOver?.length > 0
            ? controlOver.map((item, idx) => (
                <span key={idx} className="px-2 py-1 text-white rounded light-purple text-sm">
                    {item}
                </span>
            ))
            : <span className="px-2 py-1 text-white rounded light-purple text-sm">No Access</span>;

    return (
        <>
            <Grid item xs={12} className="verified-text">
                {renderVerifiedText()}
            </Grid>
            {project?.verifiyMembersList?.map((verifiy, index) => (
                <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleAccordionChange(index)}
                    className="theme-bg grey-border border !rounded-md !my-2"
                >
                    <AccordionSummary
                        className="grey-border !border-b !border-solid !min-h-px accordian-header !p-3"
                        expandIcon={<FontAwesomeIcon icon={faCaretDown} />}
                    >
                        <Grid container spacing={2} className="!gap-2 items-center">
                            <img src="/assets/verified-beg.png" className="w-8" alt="verified" />
                            <Grid>
                                <Typography className="theme-color !text-lg !leading-6 block flex gap-1 items-center">
                                    {verifiy.name || "N/A"}
                                    {project?.kycStatus === "Approved" && <FontAwesomeIcon className="text-lime-500" icon={faCircleCheck} />}
                                </Typography>
                                <Typography className="text-white !text-sm !leading-4 block designation">
                                    {verifiy.role || "N/A"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>

                    <AccordionDetails className="grey-border !border-b !border-solid !pl-3 !py-2 !pr-2 accordian-list">
                        <Typography className="text-white flex justify-between !text-sm !leading-4 items-center">
                            <span>Control Over:</span>
                            <div className="gap-2 flex control-over-span">{renderControlOver(verifiy.controlOver)}</div>
                        </Typography>
                    </AccordionDetails>

                    <AccordionDetails className="grey-border !border-b !border-solid !pl-3 !py-2 !pr-2 accordian-list">
                        <Typography className="text-white flex justify-between !text-sm !leading-4">
                            <div className="flex items-center gap-1 country-tier">
                                <span>Country Tier:</span>
                                <CountryTier />
                            </div>
                            <div className="font-bold flex items-center">
                                <img src="/assets/Country_tier_icon.png" alt="country tier" width="24px" />
                                {verifiy.countryTier || "N/A"}
                            </div>
                        </Typography>
                    </AccordionDetails>

                    <AccordionDetails className="!pl-3 !py-2 !pr-2 accordian-list">
                        <Typography className="text-white flex justify-between items-center">
                            Socials:
                            <SocialLinks verifiy={verifiy} />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
}
