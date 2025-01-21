import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


import Link from 'next/link';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import KycAccordion from '../accordion/KycAccordion';
import AuditAccordion from '../accordion/AuditAccordion';
import CertificateModal from '../modal/CertificateModal';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ProjectTab({ project }) {
    console.log("data?.kycStatus", project);
    // Set the initial active tab based on data.kycStatus
    const initialTab = project?.kycStatus === 'Approved' ? 0 : 1;
    const [value, setValue] = React.useState(initialTab);
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const kycTabName = project?.kycStatus !== 'Approved' &&
        <div className="text-red-600 flex items-center gap-2"><FontAwesomeIcon icon={faTriangleExclamation} /> No KYC</div>

    const auditedTabName = project?.auditStatus === "Completed"
        ? <div className=" flex items-center gap-2">Audit</div>
        : (
            <div className="text-red-600 flex items-center gap-2">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Not Audited
            </div>
        );
    const handleCertificateModalOpen = () => {
        setModalOpen(true);
    };

    return (
        <Box sx={{ width: '100%' }} className="!mt-3">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='dark-purple-bg card-tabs p-2 mb-3 !border grey-border border-solid rounded-md'>
                    {project?.kycStatus === 'Approved' ?
                        <Tab label="Team KYC" {...a11yProps(0)} className='!py-1.5 !px-10 !min-h-8 !rounded-md !normal-case !text-white' />
                        : (<>
                            <Link className=" w-1/2 items-center gap-2" href="https://www.assuredefi.com/#get-kyc">
                                <Tab label={kycTabName} {...a11yProps(0)} className='!py-1.5 !px-10 !min-h-8 !rounded-md !normal-case !text-white' />
                            </Link>
                        </>)}

                    <Tab label={auditedTabName} {...a11yProps(1)} className='!py-1.5 !px-10 !min-h-8 !rounded-md !normal-case grey-color' />
                </Tabs>
            </Box>
            <CustomTabPanel className="border card-verified-member mt-3 mb-3 rounded-md grey-border dark-purple-bg" value={value} index={0}>
                <KycAccordion project={project} />

            </CustomTabPanel>
            <div className='flex justify-between items-center card-buttons gap-3'>
                {value === 0 && (
                    <>
                        {project?.kycCertificate && (

                            <Button onClick={handleCertificateModalOpen} >Certificate</Button>
                        )}
                        {project?.nftUrl && (
                            <Link href={project.nftUrl} target='_blank'>
                                <Button variant="contained">NFT</Button>
                            </Link>
                        )}
                    </>
                )}

            </div>


            <CustomTabPanel value={value} index={1} className="card-audit-tab">
                {project?.auditStatus === "Completed" ?
                    <AuditAccordion project={project} />
                    : <div className='text-center min-h-60 pt-16'>
                        <p className='mb-7 text-red text-lg'>No Assure Defi Code Audit Detected</p>
                        <Link href="https://www.assuredefi.com/code-audit" className='theme-yellow-bg text-black py-4 px-5 uppercase rounded-2xl font-medium tracking-wide'> Get One Here</Link>

                    </div>
                }

            </CustomTabPanel>
            {modalOpen && (
                <CertificateModal
                    img={project.kycCertificate}
                    buttonText=""
                    open={modalOpen}
                    setOpen={setModalOpen}

                />
            )
            }
        </Box>
    );
}
