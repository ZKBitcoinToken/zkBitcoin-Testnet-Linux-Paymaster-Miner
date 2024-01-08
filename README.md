# zkBitcoin-Testnet-Linux-Paymaster-Miner
# Installing Script on Linux

Go to download Folder and
run 'sh install-deps.sh' to install dependencies.

sudo apt install build-essential

sudo apt install pkg-config libglvnd-dev

Download your graphics card driver
https://www.nvidia.com/download/index.aspx

sudo sh NVIDIA-Linux-x86_64-525.60.11.run

For NOUVEAU ERROR
https://askubuntu.com/questions/841876/how-to-disable-nouveau-kernel-driver


IF SCREEN RESOLUTION IS MESSED UP DO next two steps
1) sudo nvidia-xconfig

2) https://askubuntu.com/questions/441040/failed-to-get-size-of-gamma-for-output-default-when-trying-to-add-new-screen-res
Go to Downloaded Folder and Open Terminal


TO RUN SCRIPT OPEN TERMINAL IN FOLDER AND TYPE

chmod u+x 1runPayMaster_and_Miner.sh  or right click the file -> Properities -> Permissions and check "Allow executing file as Program"



chmod u+x testing_justPayMaster.sh or right click the file -> Properities -> Permissions and check "Allow executing file as Program"

./1runPayMaster_and_Miner.sh

to run the miner + paymaster

or

./testing_justPayMaster.sh


to test PayMaster script

or

./1ZKBTC_No_Paymaster.sh

Mines normally using your eth account to mint the tokens with no paymaster

It should run!

Edit the 1zkBTCMiner.sh file and _zkBitcoinMiner.conf to edit your settings



#For Ubuntu 20.04

sudo ubuntu-drivers autoinstall

wget http://developer.download.nvidia.com/compute/cuda/10.2/Prod/local_installers/cuda_10.2.89_440.33.01_linux.run -O ~/cuda_tmp/cuda.run

sudo ./cuda_10.2.89_440.33.01_linux.run

sudo chmod +x cuda_10.2.89_440.33.01_linux.run

dont install 440 just the 10.2 toolkit

sudo ubuntu-drivers autoinstall
