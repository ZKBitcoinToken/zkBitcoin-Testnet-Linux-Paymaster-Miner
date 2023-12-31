#!/usr/bin/env bash
echo Normal mining costing us ETH and not using the Paymaster
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
  dotnet _zkBitcoinMiner.dll allowCPU=false allowIntel=true allowAMD=true allowCUDA=true web3api=https://testnet.era.zksync.dev abiFile=zkBTC.abi contract=0xbAF148F5518505F581E8Ce84F10f385b00e87FEf  MinABASperMint=3.6  UsePayMaster=false HowManyBlocksAWAYFromAdjustmentToSendMinimumZKBTC=-10 NFTApiURL=https://abastoken.org/api/abas/0 NFTApiPath=$.result.NextNFTMint NFTApiPathID=$.result.NextNFTMintID gasToMine=0.1  gasApiMax=0.2 gasLimit=600000 gasApiURL= gasApiPath=$.safeLow gasApiMultiplier=0.1 gasApiOffset=1.0 privateKey=9f151c742cefc2d813551462c67c60cf9c6e55b6444fdc135ebb2f9d1bb19235
  [[ $? -eq 22 ]] || break
done