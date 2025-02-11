// COPY CONTRACT ADDRESS HANDLER
export const copyContractAddressesHandler = async (contractAddresses, index, setCopiedIndex) => {
    await navigator.clipboard.writeText(contractAddresses.join(", "));
    setCopiedIndex(index); // Set the index for the "Copied!" 
    setTimeout(() => setCopiedIndex(null), 2000);
};