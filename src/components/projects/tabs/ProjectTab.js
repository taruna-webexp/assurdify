import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProjectAccordion from '../accordion/ProjectAccordion';
import ProjectAccordion2 from '../accordion/ProjectAccordion2';
import Link from 'next/link';
import { Button } from '@mui/material';

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

    // Determine tab names based on kycStatus
    const kycTabName = project?.kycStatus === 'Approved' ? 'Team KYC' : <><Link href="https://www.assuredefi.com/#get-kyc">No KYC</Link> </>;
    const auditedTabName = project?.auditStatus === "Completed" ? ' Audited' : 'Not Audited';

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={kycTabName} {...a11yProps(0)} />
                    <Tab label={auditedTabName} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <ProjectAccordion project={project} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {project?.auditStatus === "Completed" ?
                    <ProjectAccordion2 project={project} />
                    : <div>
                        <p>No Assure Defi Code Audit Detected</p>
                        <Link href="https://www.assuredefi.com/code-audit"> <Button variant='contained'>Get One Here</Button></Link>

                    </div>
                }

            </CustomTabPanel>
        </Box>
    );
}
