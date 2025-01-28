import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import KycAccordion from "../accordion/KycAccordion";
import AuditAccordion from "../accordion/AuditAccordion";
import CertificateModal from "../modal/CertificateModal";

// Custom tab panel component for  tab content
function CustomTabPanel({ children, value, index, ...other }) {
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
  children: PropTypes.node, // Children elements inside the tab panel
  index: PropTypes.number.isRequired, // Tab panel index
  value: PropTypes.number.isRequired, // Current tab value
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProjectTab({ project }) {
  // Determine the initial tab based on project KYC status
  const initialTab = project?.kycStatus === "Approved" ? 0 : 1;
  const [value, setValue] = React.useState(initialTab); // State for selected tab
  const [modalOpen, setModalOpen] = React.useState(false); // State for modal visibility

  // Handle tab change
  const handleChange = (event, newValue) => setValue(newValue);

  //  KYC tab label  based on project KYC status
  const kycTabName = project?.kycStatus !== "Approved" && (
    <div className="text-red flex items-center gap-2">
      <FontAwesomeIcon icon={faTriangleExclamation} /> No KYC
    </div>
  );

  //  Audit tab label  based on project audit status
  const auditedTabName =
    project?.auditStatus === "Completed" ? (
      <div className="flex text-white items-center gap-2">Audit</div>
    ) : (
      <div className="text-red flex items-center gap-2">
        <FontAwesomeIcon icon={faTriangleExclamation} /> Not Audited
      </div>
    );

  // Handle opening  certificate modal
  const handleCertificateModalOpen = () => setModalOpen(true);

  return (
    <Box sx={{ width: "100%" }} className="!mt-3">
      {/* Tabs header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="project tabs"
          className="dark-purple-bg card-tabs p-2 mb-3 !border grey-border border-solid rounded-md"
        >
          {/* KYC Tab */}
          {project?.kycStatus === "Approved" ? (
            <Tab
              label="Team KYC"
              {...a11yProps(0)}
              className="!py-1.5 !px-10 !min-h-8 !rounded-md !normal-case !text-white"
            />
          ) : (
            <Link
              className="w-1/2 items-center flex gap-2"
              href="https://www.assuredefi.com/#get-kyc"
            >
              <Tab
                label={kycTabName}
                {...a11yProps(0)}
                className="!py-1.5 !px-10 !min-h-8 !rounded-md !normal-case !text-white"
              />
            </Link>
          )}
          {/* Audit Tab */}
          <Tab
            label={auditedTabName}
            {...a11yProps(1)}
            className="!py-1.5 !px-10 !min-h-8 !rounded-md !normal-case grey-color"
          />
        </Tabs>
      </Box>

      {/* KYC Tab Panel */}
      <CustomTabPanel
        className="border card-verified-member mt-0 mb-3 rounded-md grey-border dark-purple-bg"
        value={value}
        index={0}
      >
        <KycAccordion project={project} />
      </CustomTabPanel>

      {/* Buttons under KYC tab */}
      <div className="flex justify-between items-center card-buttons gap-3 x">
        {value === 0 && (
          <>
            {/* Certificate Button */}
            {project?.kycCertificate && (
              <Button
                className="button-under-kyc"
                onClick={handleCertificateModalOpen}
              >
                Certificate
              </Button>
            )}
            {/* NFT Button */}
            {project?.nftUrl && (
              <Link href={project.nftUrl} target="_blank">
                <Button className="button-under-kyc " variant="contained">
                  NFT
                </Button>
              </Link>
            )}
          </>
        )}
      </div>
      {/* Audit Tab Panel */}
      <CustomTabPanel value={value} index={1} className="card-audit-tab">
        {project?.auditStatus === "Completed" ? (
          <AuditAccordion project={project} />
        ) : (
          <div className="text-center min-h-80 pt-16">
            <p className="mb-5 text-red text-lg">
              No Assure Defi Code Audit Detected
            </p>
            <Link
              href="https://www.assuredefi.com/code-audit"
              target="_blank"
              className="theme-yellow-bg text-black  no-audit-button"
            >
              Get One Here
            </Link>
          </div>
        )}
      </CustomTabPanel>
      {/* Certificate Modal */}
      {modalOpen && (
        <CertificateModal
          img={project.kycCertificate}
          buttonText=""
          open={modalOpen}
          setOpen={setModalOpen}
        />
      )}
    </Box>
  );
}
