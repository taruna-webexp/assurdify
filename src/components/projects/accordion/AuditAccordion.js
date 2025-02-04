"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BlockChainImages, blockchainNames } from "../BlockChainImages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faDownload } from "@fortawesome/free-solid-svg-icons";
import ContractAdress from "../varificationdetail/ContractAdress";
import Image from "next/image";

export default function AuditAccordion({ project }) {
  return (
    <div className="max-h-96 overflow-auto custom-scroll flex flex-col gap-2.5">
      {project.auditReportList?.length > 0 ? (
        project.auditReportList.map((report, index) => {
          return (
            <div
              key={index}
              className="border px-3 pt-3 rounded-md grey-border dark-purple-bg"
            >
              <div className="flex justify-between text-sm items-center mb-2">
                <span>
                  Audit Score:{" "}
                  <strong className="text-lime-500">
                    {report.auditScore}/100
                  </strong>
                </span>
              </div>
              {/* contract  Address*/}
              <ContractAdress project={project} index={index} />
              <div className="grey-border border p-3 rounded-md mb-2">
                <div className="flex justify-between items-center">
                  <strong className="text-sm font-normal">Ecosystem:</strong>
                  {project?.blockchain?.length > 0 &&
                    BlockChainImages[project.blockchain[0]] && (
                      <div className="flex items-center justify-end gap-2">
                        <Image
                          width={25}
                          height={100}
                          src={BlockChainImages[project.blockchain[0]]}
                          alt={project.blockchain[0]}
                          className="w-5"
                        />
                        {blockchainNames[project.blockchain[0]] ||
                          project.blockchain[0]}
                      </div>
                    )}
                </div>
              </div>
              <div className="grey-border border p-3 rounded-lg mb-2">
                <Typography
                  variant="body2"
                  className="flex justify-between items-center"
                >
                  <strong className="text-sm font-normal">Description:</strong>
                  <span className="italic text-white ">
                    {report.auditDescription
                      ? report.auditDescription
                      : "-------"}
                  </span>
                </Typography>
              </div>
              <div className="flex mb-3 gap-2 report-buttons flex-wrap">
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      window.open(report.githubReportLink, "_blank")
                    }
                  >
                    <FontAwesomeIcon className="!text-sm" icon={faLink} />{" "}
                    GitHub
                  </Button>
                </div>
                {report.initialAuditReport &&
                  report.initialAuditReport.map((audit, idx) => (
                    <div key={audit.url}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => window.open(audit.url, "_blank")}
                      >
                        <FontAwesomeIcon
                          className="!text-sm"
                          icon={faDownload}
                        />
                        {idx + 1}Initial Report
                      </Button>
                    </div>
                  ))}
                {report.finalAuditReport && (
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        window.open(report.finalAuditReport[0].url, "_blank")
                      }
                    >
                      <FontAwesomeIcon className="!text-sm" icon={faDownload} />
                      Final Report
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <Typography className="py-12 text-center text-red-600">
          No Audit record found
        </Typography>
      )}
    </div>
  );
}
