#!/usr/bin/env bash

# Check if transactionHash.txt exists and delete it
if [ -f transactionHash.txt ]; then
    rm transactionHash.txt
fi


# Path to your JSON file
JSONFilePath="./1zkBTCMiner.sh"

# Check if the JSON file exists
if [ ! -f "$JSONFilePath" ]; then
    echo "JSON file not found: $JSONFilePath"
    exit 1
fi

# Modify the UsePayMaster field
sed -i 's/UsePayMaster=false/UsePayMaster=true/g' "$JSONFilePath"
# Rest of your script...


# Check for Node.js
if ! command -v node &> /dev/null
then
    echo "Node.js is not found or not installed."
    echo "Download and install Node.js from https://nodejs.org/"
    exit 1
fi

# Check for Yarn
if ! command -v yarn &> /dev/null
then
    echo "Yarn is not found or not installed."
    echo "Download and install Yarn from https://classic.yarnpkg.com/en/docs/install/"
    echo "Then run script again to install dependencies"
    exit 1
fi

# Change directory to the location of your TypeScript script
cd aPayMaster/

# Run the test deployment script
echo "Running test deployment script..."
yarn hardhat deploy-zksync --script deploy_blank.ts &

sleep 2
echo "I am sleeping for 3 seconds before launch."
sleep 3

# Check if the deployment script created a specific file
if [ ! -f "deploy/SetupWorking.txt" ]; then
    echo "File does not exist: deploy/SetupWorking.txt"
    echo "Script execution failed. Please install yarn dependencies using 'yarn install' in the aPayMaster folder."
    echo "Re-run this script after installs."
    yarn install
    yarn
    yarn add @openzeppelin/contracts
    echo "Run this script again"
fi

# Run the TypeScript script in the background
yarn hardhat deploy-zksync --script use-paymaster.ts &

cd ..

# Check for .NET Core
if ! command -v dotnet &> /dev/null
then
    echo ".NET Core is not found or not installed,"
    echo "download and install from https://www.microsoft.com/net/download/windows/run"
    exit 1
fi

