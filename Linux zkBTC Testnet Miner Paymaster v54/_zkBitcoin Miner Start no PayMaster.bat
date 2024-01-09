@echo off
setlocal



set "FileName=_zkBitcoinMiner.conf"
set "FullPath=%cd%\%FileName%"

echo Full path is: %FullPath%

:: Set JSONFilePath to the actual full path
set "JSONFilePath=%FullPath%"


:: PowerShell command to modify the JSON file and adjust formatting
PowerShell -Command "$json = Get-Content -Path '%JSONFilePath%' | Out-String | ConvertFrom-Json; $json.UsePayMaster = $false; $jsonString = $json | ConvertTo-Json -Depth 10; $jsonString = $jsonString -replace '\[\r\n\s+\]', '[]'; Set-Content -Path '%JSONFilePath%' -Value $jsonString"

endlocal

echo "I am sleeping for 3 seconds before launch."

timeout /t 3 /nobreak >nul

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
echo Run script again if u just installed things
pause
echo Run script again if u just installed things
pause