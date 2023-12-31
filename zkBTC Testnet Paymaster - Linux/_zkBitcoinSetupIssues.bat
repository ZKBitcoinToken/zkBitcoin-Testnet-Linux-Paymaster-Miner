:: Change directory to the location of your TypeScript script
cd aPayMaster/deploy/

if exist SetupWorking.txt del SetupWorking.txt


:: Run the test deployment script
echo Running test deployment script...

start "" /B yarn hardhat deploy-zksync --script deploy_blank.ts

timeout /t 2 /nobreak >nul

echo "I am sleeping for 3 seconds before launch."

timeout /t 3 /nobreak >nul


:: Check if the deployment script created a specific file

if not exist "deploy/SetupWorking.txt" (
    echo File does not exist: deploy\SetupWorking.txt
    echo Script execution failed. Please install yarn dependencies using `yarn install` in the aPayMaster folder.
    echo Re run this script after installs.
    yarn install
    yarn
    yarn add @openzeppelin/contracts
    yarn hardhat compile
    echo Run this script again
)

if %errorlevel% NEQ 0 (
   echo File does not exist: deploy\SetupWorking.txt
    echo Script execution failed. Please install yarn dependencies using `yarn install` in the aPayMaster folder.
    echo Re run this script after installs.
    yarn install
    yarn
    yarn add @openzeppelin/contracts
    yarn hardhat compile
    echo Run this script again
)




:: Run the TypeScript script in the background
start "" /B yarn hardhat deploy-zksync --script use-paymaster.ts




cd ..





@echo off
pushd %~dp0

for %%X in (dotnet.exe) do (set FOUND=%%~$PATH:X)
if defined FOUND (goto dotNetFound) else (goto dotNetNotFound)

:dotNetNotFound
echo .NET Core is not found or not installed,
echo download and install from https://www.microsoft.com/net/download/windows/run
goto end


:dotNetFound
:startMiner
_zkBitcoinMiner.exe

if %errorlevel% EQU 22 (
    goto startMiner
)

pause

:end