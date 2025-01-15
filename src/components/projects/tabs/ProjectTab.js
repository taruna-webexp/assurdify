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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const kycTabName = project?.kycStatus === 'Approved'
        ? <div>Team KYC</div>
        : (
            <>
                <Link className="text-red-600 flex items-center gap-2" href="https://www.assuredefi.com/#get-kyc">
                    <FontAwesomeIcon icon={faTriangleExclamation} /> No KYC
                </Link>
            </>
        );

    const auditedTabName = project?.auditStatus === "Completed"
        ? 'Audit'
        : (
            <div className="text-red-600 flex items-center gap-2">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                Not Audited
            </div>
        );

    return (
        <Box sx={{ width: '100%' }} className="!mt-3">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='dark-purple-bg card-tabs p-2 !border grey-border border-solid rounded-md'>
                    <Tab label={kycTabName} {...a11yProps(0)} className='!py-1.5 !px-10 !min-h-8 !rounded-md !normal-case' />
                    <Tab label={auditedTabName} {...a11yProps(1)} className='!py-1.5 !px-10 !min-h-8 !rounded-md !normal-case' />
                </Tabs>
            </Box>
            <CustomTabPanel className="border card-verified-member mt-3 rounded-md grey-border dark-purple-bg" value={value} index={0}>
                <KycAccordion project={project} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {project?.auditStatus === "Completed" ?
                    <AuditAccordion project={project} />
                    : <div>
                        <p>No Assure Defi Code Audit Detected</p>
                        <Link href="https://www.assuredefi.com/code-audit"> <Button variant='contained'>Get One Here</Button></Link>

                    </div>
                }

            </CustomTabPanel>
        </Box>
    );
}
