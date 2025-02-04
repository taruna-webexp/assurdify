import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function ContractAdress({ project, index }) {
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  //COPY CONTRACT ADDRESS HANDLER
  const copyContractAddressesHandler = async (contractAddresses) => {
    await navigator.clipboard.writeText(contractAddresses.join(", "));
    setCopiedIndex(index); // Set the index for the "Copied!"
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <div className="grey-border border p-3 rounded-md mb-2 dark-purple-bg">
        <div>
          <strong className="text-sm font-normal">
            Contract Address:
            <div className="light-purple p-3 flex justify-between items-center copy-icon rounded-md mt-2 theme-color text-sm overflow-hidden">
              <span className="break-all flex-1">
                {project.contractAddress || report.contractAddress}
              </span>

              {copiedIndex === index ? (
                <span className="text-white">Copied!</span>
              ) : (
                <Image
                  width={18}
                  height={18}
                  src="/assets/solar_copy-bold.png"
                  alt="copy-bold.png"
                  className="cursor-pointer"
                  onClick={() =>
                    copyContractAddressesHandler([
                      project.contractAddress || report.contractAddress,
                    ])
                  }
                />
              )}
            </div>
          </strong>
        </div>
      </div>
    </>
  );
}
