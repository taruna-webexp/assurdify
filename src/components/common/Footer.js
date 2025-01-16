"use client"
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { faLinkedin, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
    return (<>
        <Box className="footer !text-white pt-12 px-12 pb-0" >

            <Grid
                container
                spacing={4}
                className="!max-w-full mx-auto !w-full !m-0"
            >
                <Grid md={12} className="flex justify-between items-center gap-8 !mb-12">
                    <div className="w-full">
                        <hr />
                    </div>
                    <div className="min-w-32 text-center">
                        <img src="/assets/Assure-brand-mark-gold.webp" className="m-auto" />
                    </div>
                    <div className="w-full">
                        <hr />
                    </div>
                </Grid>
                {/* First Grid Section */}
                <Grid item xs={12} md={4} className="space-y-2 !p-0 contact-detail">
                    <Typography variant="h6" className="font-bold text-[#e2d243]">
                        <img src="/assets/logo-a.webp" />
                    </Typography>
                    <div className="flex gap-8 !my-8">
                        <Link href="#" className="!text-2xl theme-color"><FontAwesomeIcon icon={faXTwitter} /></Link>
                        <Link href="#" className="!text-2xl theme-color"><FontAwesomeIcon icon={faLinkedin} /></Link>
                        <Link href="#" className="!text-2xl theme-color"><FontAwesomeIcon icon={faYoutube} /></Link>
                    </div>
                    <Typography className="!text-sm">Assure DeFi<br />
                        c/o Perkinson Legal<br />
                        201 E. 8th Street<br />
                        Cincinnati, OH 45202</Typography>
                </Grid>

                {/* Second Grid Section */}
                <Grid item xs={12} md={4} className="space-y-2 !p-0 site-links">
                    <Typography variant="h6" className="font-bold text-[#e2d243] !text-2xl uppercase !font-normal !mb-3">
                        Site Links
                    </Typography>
                    <Link href="#" className="!text-sm !mt-0 !mb-1 block">Careers</Link>
                    <Link href="#" className="!text-sm !mt-0 !mb-1 block">Downloads</Link>
                    <Link href="#" className="!text-sm !mt-0 !mb-1 block">Verified Projects</Link>
                    <Link href="#" className="!text-sm !mt-0 !mb-1 block">FAQs</Link>
                    <Typography variant="h6" className="font-bold text-[#e2d243] !text-2xl uppercase !font-normal !mt-5 !mb-3">
                        LEGALS
                    </Typography>
                    <Link href="#" className="!text-sm !mt-0 !mb-1 block">Terms & Conditions</Link>
                    <Link href="#" className="!text-sm !mt-0 !mb-1 block">Privacy Policy</Link>
                    <Link href="#" className="!text-sm !mt-0 !mb-1 block">Cookies Policy</Link>
                    <Link href="#" className="!text-sm !mt-0 !mb-1 block">Data Handling Storage Policy</Link>
                </Grid>

                {/* Third Grid Section */}
                <Grid item xs={12} md={4} className="space-y-2 !p-0 disclaimer">
                    <Typography variant="h6" className="font-bold text-[#e2d243] !text-2xl uppercase !font-normal !mb-3">
                        Disclaimer
                    </Typography>
                    <Typography variant="body2" className="text-left text-sm !mt-0 !mb-5">
                        An Assure DeFi KYC verification does not guarantee the legitimacy or safety of any project or company.
                        The actions of the project leadership team, after the KYC verification is issued, is not, in any way, under the control of Assure DeFi.
                        As with all speculative investing, we strongly urge you to complete your own project due diligence, and invest wisely at your own risk.
                        Assure DeFi does not accept responsibility for any losses acquired from investing in KYC verified projects.
                    </Typography>
                    <Typography variant="body2" className="text-left text-sm !mt-0 !mb-5">
                        Assure is an impartial service. We professionally verify, record and securely store the identity information and the project role of individuals completing the project verification process.
                        Assure DeFi does not make judgments about suspected criminal activity, but they do support investigations, if fraud is suspected by investors on a verified project.
                    </Typography>
                    <Typography variant="body2" className="text-left text-sm !mt-0 !mb-5">
                        In the event of suspected fraud, Assure DeFi will provide the nationality of the project KYC verified individuals,
                        to assist investors in reporting and communicating with the appropriate enforcement authorities. If properly compelled by an appropriate law
                        enforcement authority, and upon the approval by their independent legal counsel, Assure Defi will release a complete vaulted project verification file to that authority, and will fully assist the enforcement authorities in pursuit of those suspected of Blockchain fraud.
                    </Typography>

                </Grid>

                <Grid md={12} className="mt-12 mb-4">
                    <Typography className="text-center !text-sm">© 2025 Projects Assure DeFi® | All Rights Reserved.</Typography>
                </Grid>
            </Grid>
        </Box>
    </>
    );
};

export default Footer;











