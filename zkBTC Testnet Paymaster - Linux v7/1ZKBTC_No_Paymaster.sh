#!/usr/bin/env bash
echo Normal minting costs us ETH and doesnt use the paymaster make sure UsePayMaster=false

 Check for dotnet
if ! command -v dotnet &> /dev/null
then
    echo "dotnet 5.0 is not found or not installed."
    echo "Installing dotnet 5.0..."

    # Add Microsoft package signing key and repository
    wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    sudo apt-get update; \
    sudo apt-get install -y apt-transport-https && \
    sudo apt-get update && \
    sudo apt-get install -y dotnet-sdk-5.0

    # Verify the installation
    dotnet --version

    echo "dotnet 5.0 is installed. Rerun the script to start."

    goto end
else
    echo "dotnet 5.0 is already installed."
fi

while : ; do
  if [ -f _zkBitcoinMiner.conf ] ; then
    rm -f _zkBitcoinMiner.conf
  fi
  dotnet _zkBitcoinMiner.dll allowCPU=false allowIntel=true allowAMD=true allowCUDA=true web3api=https://testnet.era.zksync.dev abiFile=zkBTC.abi contract=0xee28960041bde3fdb16C6b7Bc0fd7F86ec54F1aF  MinABASperMint=3.6  UsePayMaster=false HowManyBlocksAWAYFromAdjustmentToSendMinimumZKBTC=-10 NFTApiURL=https://abastoken.org/api/abas/0 NFTApiPath=$.result.NextNFTMint NFTApiPathID=$.result.NextNFTMintID gasToMine=0.1  gasApiMax=0.2 gasLimit=600000 gasApiURL= gasApiPath=$.safeLow gasApiMultiplier=0.1 gasApiOffset=1.0 privateKey=9f151c742cefc2d813551462c67c60cf9c6e55b6444fdc135ebb2f9d1bb19235
  [[ $? -eq 22 ]] || break
done
