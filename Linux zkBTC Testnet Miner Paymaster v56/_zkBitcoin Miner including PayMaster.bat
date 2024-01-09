@echo off
if exist transactionHash.txt del transactionHash.txt



:: Change directory to the location of your TypeScript script
cd aPayMaster/


:: Check for Node.js
where node >nul 2>&1
if %errorlevel% NEQ 0 (
    echo Node.js is not found or not installed.
    echo Download and install Node.js from https://nodejs.org/
    @echo off
    echo Downloading Node.js...
    curl -o node-v20.10.0-x64.msi https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi
    echo Installing Node.js...
    start /wait node-v20.10.0-x64.msi
    echo Node.js installation complete.
    pause
    goto end
)

:: Check for Yarn
where yarn >nul 2>&1
if %errorlevel% NEQ 0 (
    echo Yarn is not found or not installed.
    echo Download and install Yarn from https://classic.yarnpkg.com/en/docs/install/
    echo then run script again to install depenicies

    npm install --global yarn

    echo yarn installation complete.
    yarn install
	yarn
	yarn install
	echo reRun Script to start miner!!!
    goto end
)



pushd %~dp0



@echo off

set "FileName=_zkBitcoinMiner.conf"
set "FullPath=%cd%\%FileName%"

echo Full path is: %FullPath%

:: Set JSONFilePath to the actual full path
set "JSONFilePath=%FullPath%"

:: PowerShell command to modify the JSON file and adjust formatting
PowerShell -Command "$json = Get-Content -Path '%JSONFilePath%' | Out-String | ConvertFrom-Json; $json.UsePayMaster = $true; $jsonString = $json | ConvertTo-Json -Depth 10; $jsonString = $jsonString -replace '\[\r\n\s+\]', '[]'; Set-Content -Path '%JSONFilePath%' -Value $jsonString"



cd aPayMaster/




set "FileName=_zkBitcoinMiner.conf"
set "FullPath=%cd%\%FileName%"

echo Full path2 is: %FullPath%

:: Run the test deployment script
echo Running test deployment script...

start "" /B yarn hardhat deploy-zksync --script deploy_blank.ts

timeout /t 2 /nobreak >nul

echo "I am sleeping for 3 seconds before launch."

timeout /t 3 /nobreak >nul



set "FileName=_zkBitcoinMiner.conf"
set "FullPath=%cd%\%FileName%"

echo Full path3 is: %FullPath%
:: Check if the deployment script created a specific file
if not exist "deploy/SetupWorking.txt" (
    echo File does not exist: deploy\SetupWorking.txt
    echo Script execution failed. Please install yarn dependencies using `yarn install` in the aPayMaster folder.
    echo Re run this script after installs.
    call yarn install
    call yarn
    call yarn add @openzeppelin/contracts

    echo Run this script again


    goto end
)




cd ..

echo Starting PayMaster.bat
start /B _zkJustPaymaster-2.bat
echo _zkJustPaymaster-2.bat is running now








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


yarn install
pause

:end

yarn install
echo Run script again if u just installed things
pause
echo Run script again if u just installed things
pause