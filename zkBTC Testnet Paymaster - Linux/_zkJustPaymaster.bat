@echo off
if exist transactionHash.txt del transactionHash.txt

pushd %~dp0

:: Check for Node.js
where node >nul 2>&1
if %errorlevel% NEQ 0 (
    echo Node.js is not found or not installed.
    echo Download and install Node.js from https://nodejs.org/
    goto end
)

:: Check for Yarn
where yarn >nul 2>&1
if %errorlevel% NEQ 0 (
    echo Yarn is not found or not installed.
    echo Download and install Yarn from https://classic.yarnpkg.com/en/docs/install/
    echo then run script again to install depenicies
    goto end
)


@echo off
setlocal

set JSONFilePath=_zkBitcoinMiner.conf

:: PowerShell command to modify the JSON file and adjust formatting
PowerShell -Command "$json = Get-Content -Path '%JSONFilePath%' | Out-String | ConvertFrom-Json; $json.UsePayMaster = $true; $jsonString = $json | ConvertTo-Json -Depth 10; $jsonString = $jsonString -replace '\[\r\n\s+\]', '[]'; Set-Content -Path '%JSONFilePath%' -Value $jsonString"

endlocal


:: Change directory to the location of your TypeScript script
cd aPayMaster/



:: Run the test deployment script
echo Running test deployment script...

start "" /B yarn hardhat deploy-zksync --script deploy_blank.ts

timeout /t 5 /nobreak >nul

echo "I am sleeping for 5 seconds before launch."

:: Check if the deployment script created a specific file
if not exist "deploy/SetupWorking.txt" (
    echo File does not exist: deploy\SetupWorking.txt
    echo Script execution failed. Please install yarn dependencies using `yarn install` in the aPayMaster folder.
    yarn install
    yarn
    echo Run this script again
)





:: Run the TypeScript script in the background
start "" /B yarn hardhat deploy-zksync --script use-paymaster.ts



pause

:end