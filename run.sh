#!/bin/bash

# throw error if failed
set -o errexit -o nounset

# sourcing nvm
. "$NVM_DIR/nvm.sh"

HUBSPOT_YML_FILE=./hubspot.config.yml

case "$1" in
  dev)
    # check for local hubspot config, if doesn't exists, tell user to setup first
    if [ -f "$HUBSPOT_YML_FILE" ]; then
        echo 'Booting up local watcher'
        nvm install
        nvm use
        npm install --legacy-peer-deps

        npx hs watch ./src core-clinic-theme --initial-upload --remove
    else
        echo 'Please first setup a local HubSpot sandbox account first by running `./run.sh setup`.'
        exit 1
    fi

    ;;

  upload)
    if [ -f "$HUBSPOT_YML_FILE" ]; then
        echo 'Uploading theme'
        nvm install
        nvm use
        npm install --legacy-peer-deps
        # remove existing files
        npx hs remove core-clinic-theme
        # upload everything again
        npx hs upload ./src core-clinic-theme
    else
        echo 'Please first setup a local HubSpot sandbox account first by running `./run.sh setup`.'
        exit 1
    fi

    ;;

  setup)
    echo 'Setting up HubSpot'

    nvm install
    nvm use
    npm install --legacy-peer-deps
    npx hs init

    ;;

  *)
    echo 'Please choose an option: "dev", "setup", or "upload".'
    exit 1

    ;;
esac

