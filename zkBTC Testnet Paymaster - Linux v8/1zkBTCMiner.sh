#!/usr/bin/env bash

command -v dotnet >/dev/null 2>&1 ||
{
 echo >&2 ".NET Core is not found or not installed,"
 echo >&2 "run 'sh install-deps.sh' to install dependencies.";
 read -p "Press any key to continue...";
 exit 1;
}
while : ; do
  if [ -f _zkBitcoinMiner.conf ] ; then
    rm -f _zkBitcoinMiner.conf
  fi
  dotnet _zkBitcoinMiner.dll allowCPU=false allowIntel=true allowAMD=true allowCUDA=true web3api=https://testnet.era.zksync.dev abiFile=zkBTC.abi contract=0xee28960041bde3fdb16C6b7Bc0fd7F86ec54F1aF  MinABASperMint=3.6  UsePayMaster=true HowManyBlocksAWAYFromAdjustmentToSendMinimumZKBTC=-10 NFTApiURL=https://abastoken.org/api/abas/0 NFTApiPath=$.result.NextNFTMint NFTApiPathID=$.result.NextNFTMintID gasToMine=0.5  gasApiMax=1 gasLimit=600000 gasApiURL= gasApiPath=$.safeLow gasApiMultiplier=0.1 gasApiOffset=1.0 privateKey=9f151c742cefc2d813551462c67c60cf9c6e55b6444fdc135ebb2f9d1bb19235
  [[ $? -eq 22 ]] || break
done
