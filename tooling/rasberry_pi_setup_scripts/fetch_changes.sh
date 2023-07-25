#!/bin/bash
set -e # exit on error
set -u # exit on undefined variable

# ------------------------------------------------------------------------------
# ---- Helpful Variables -------------------------------------------------------
# ------------------------------------------------------------------------------

PATH_TO_THIS_SCRIPT=$(readlink -f -- $0)
FOLDER_CONTAINING_THIS_SCRIPT=${PATH_TO_THIS_SCRIPT%/*}
CURRENT_DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# ----- RPi Model Details ------------------------------------------------------
# from https://raspberrypi.stackexchange.com/questions/100076/what-revisions-does-cat-proc-cpuinfo-return-on-the-new-pi-4-1-2-4gb
PI_CPU_MODEL=$(cat /proc/cpuinfo | grep 'Hardware' | awk '{print $3}')
PI_CPU_ARCHITECTURE=$(arch)

# ----- terminal text colors ----------------------------------------------------
Green="\033[37;42;1m"  # Green color code for console text
Blue="\033[37;44;1m"   # Blue color code for console text
Black="\033[37;40;1m" # Black color code for console text
Red="\033[37;41;1m"    # Red color code for console text
Color_Off="\033[0m" # Text color Reset code for console text
echoBlue() { echo -e "$Blue $@ $Color_Off" >&2;}
echoGreen() { echo -e "$Green $@ $Color_Off" >&2; }
echoRed() { echo -e "$Red $@ $Color_Off" >&2; }

# Function to display commands in Black before running them
exe() { echo -e "$Black> $@ $Color_Off" >&2; eval "$@" ; }

# --------------------------------------------
# ------------ Main Script Body -------------
# --------------------------------------------


echoBlue "Pulling changes to rov-web from Github"
exe "cd ~/rov-web"
exe "git stash push -m 'Auto Stash $CURRENT_DATE'" # stash any changes to the web page before overwriting them
changes=$(git pull --rebase)
echoBlue "changes: $changes"
tracked_files=$(git ls-files)

echoBlue "Downloading both rov-web release from Github"
exe "mkdir -p ~/temp/rov-web-download"
exe "cd ~/temp/rov-web-download"
exe "wget 'https://github.com/KW-M/rov-web/releases/latest/download/project.zip' -O project.zip"
exe "unzip project.zip -x '$tracked_files .git/*' && rm project.zip"
exe "cp -rf ~/temp/rov-web-download/* ~/rov-web/"
exe "rm -rf ~/temp"
exe "bash ~/rov-web/tooling/rasberry_pi_setup_scripts/apply_changes.sh '$changes'"

# -------------------- Done ------------------------

echoBlue "fetch_changes.sh Done"
