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
import { renderControlOver, renderVerifiedText } from "../varificationdetail/KycDetailData";

export default function KycAccordion({ project }) {
    const [expanded, setExpanded] = useState(0);

    // kyc audit Accordin handle change
    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    return (
        <>
            <Grid item xs={12} className="verified-text">
                {renderVerifiedText(project)}
            </Grid>
            {project?.verifiyMembersList?.map((verifiy, index) => (
                <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleAccordionChange(index)}
                    className="theme-bg grey-border border !rounded-md !my-2 "
                >
                    <AccordionSummary
                        className="grey-border gap-1  !border-solid !min-h-px accordian-header !p-3"
                        expandIcon={<FontAwesomeIcon icon={faCaretDown} />}
                    >
                        <div
                            container
                            spacing={2}
                            className="!gap-2 items-center  kyc-accordin-data "
                        >
                            {/* Verified Icon */}
                            <div className="flex justify-center sm:justify-start">
                                <img
                                    src="/assets/verified-beg.png"
                                    className="w-8"
                                    alt="verified"
                                />
                            </div>

                            {/* Text Section */}
                            <div className="flex flex-col gap-1 text-left sm:text-left">
                                <Typography className="theme-color !text-lg !leading-6 flex items-center gap-1">
                                    {verifiy.name || "N/A"}
                                    {project?.kycStatus === "Approved" && (
                                        <FontAwesomeIcon
                                            className="text-lime-500"
                                            icon={faCircleCheck}
                                        />
                                    )}
                                </Typography>
                                <Typography className="text-white !text-sm !leading-4 block designation">
                                    {verifiy.role || "N/A"}
                                </Typography>
                            </div>
                        </div>
                    </AccordionSummary>

                    <AccordionDetails className="grey-border !border-t !border-b !border-solid !pl-3 !py-2 !pr-2 accordian-list">
                        <Typography className="text-white flex justify-between !text-sm !leading-4 items-center">
                            <span>Control Over:</span>
                            <div className="gap-2 flex control-over-span">
                                {renderControlOver(verifiy.controlOver)}
                            </div>
                        </Typography>
                    </AccordionDetails>

                    <AccordionDetails className="grey-border !border-b !border-solid !pl-3 !py-2 !pr-2 accordian-list">
                        <Typography className="text-white flex justify-between !text-sm !leading-4">
                            <div className="flex items-center gap-1 country-tier">
                                <span>Country Tier:</span>
                                <CountryTier />
                            </div>
                            <div className="font-bold flex items-center">
                                <img
                                    src="/assets/Country_tier_icon.png"
                                    alt="country tier"
                                    width="24px"
                                />
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
