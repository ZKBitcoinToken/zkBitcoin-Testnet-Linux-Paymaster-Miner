#!/usr/bin/env bash

command -v dotnet >/dev/null 2>&1 ||
{
 echo >&2 ".NET Core is not found or not installed,"
 echo >&2 "run 'sh install-deps.sh' to install dependencies.";
 read -p "Press any key to continue...";
 exit 1;
}
while : ; do
 
  dotnet _zkBitcoinMiner.dll allowCPU=false allowIntel=true allowAMD=true allowCUDA=true web3api=https://testnet.era.zksync.dev abiFile=zkBTC.abi contract=0xbAF148F5518505F581E8Ce84F10f385b00e87FEf  MinABASperMint=3.6  UsePayMaster=true HowManyBlocksAWAYFromAdjustmentToSendMinimumZKBTC=-10 NFTApiURL=https://abastoken.org/api/abas/0 NFTApiPath=$.result.NextNFTMint NFTApiPathID=$.result.NextNFTMintID gasToMine=0.3  gasApiMax=0.3 gasLimit=600000 gasApiURL= gasApiPath=$.safeLow gasApiMultiplier=0.1 gasApiOffset=1.0 minerAddress=0x851c0428ee0be11f80d93205f6cB96adBBED22e6 privateKey=72fc85c5baf936bdc7970c64b0119c086cfde9700687e155a572dad5cee26af2
  [[ $? -eq 22 ]] || break
done
