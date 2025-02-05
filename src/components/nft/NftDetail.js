"use client";
import axios from "axios";
import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function NftDetail() {
  const [nftData, setNftData] = React.useState(null);

  const fetchNftData = async () => {
    try {
      const response = await axios.get(
        "https://f8c57983cc667d6e65c5a97b75f55251.ipfscdn.io/ipfs/bafybeidydkhfdadnrjpncnhx3m2g6v3th5plogoq6gk36vjj675joz57hu/0/"
      );
      setNftData(response.data);
    } catch (error) {
      console.error("Error fetching NFT data", error);
    }
  };

  React.useEffect(() => {
    fetchNftData();
  }, []);

  if (!nftData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <Grid container spacing={4}>
        {/* Left Side: Metadata */}
        <Grid item xs={12} md={6}>
          <Box className=" bg-gray-100 p-6 rounded-xl shadow-lg flex flex-col justify-between  h-auto">
            <div>
              <Link href="/">
                <Button className="kyc-button !capitalize !rounded-md !text-base !text-white !font-medium !leading-4 gradient-bg !px-4 !py-2">
                  Go Back
                </Button>
              </Link>
            </div>

            <Typography
              variant="h4"
              className="font-bold text-gray-900 !mb-6 !mt-4"
            >
              {nftData.name}
            </Typography>
            <Typography variant="body1" className="text-gray-700 !mb-6">
              {nftData.description}
            </Typography>
            <Link
              href="https://polygonscan.com/nft/0x60929fb138c4a08088791530211e255b7a238101/258"
              className="text-blue-700 mb-4 underline"
            >
              View Transaction on chain
            </Link>
            <div className="space-y-4">
              <Typography className="text-black mb-4 !text-2xl">
                <strong> Meta data: </strong>
              </Typography>
              {nftData.attributes.map((attr, index) => (
                <Box
                  key={index}
                  className="bg-white p-8  rounded-xl shadow-md !mb-4 border-2 border-solid "
                >
                  <div className="flex items-center justify-between">
                    <Typography className="text-black text-2xl">
                      <strong className="!break-normal">
                        {attr.trait_type}
                      </strong>
                    </Typography>
                    <Typography
                      variant=""
                      className={`${
                        attr.value.startsWith("http")
                          ? "text-blue-700 underline"
                          : "text-black font-bold"
                      }`}
                    >
                      {attr.value}
                    </Typography>
                  </div>
                </Box>
              ))}
            </div>
          </Box>
        </Grid>

        {/* Right Side: Image */}
        <Grid item xs={12} md={6}>
          <Box className="flex justify-center items-center bg-gray-50 p-6 rounded-xl shadow-lg h-full">
            <Image
              height={100}
              width={100}
              alt="nft-image"
              src={`https://ipfs.io/ipfs/${nftData.image.split("ipfs://")[1]}`}
              className="w-full h-full object-cover rounded-xl nft-image"
              priority
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
