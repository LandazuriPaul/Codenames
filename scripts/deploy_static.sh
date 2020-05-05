#!/usr/bin/env bash

# Hosting information
FULL_HOST_ADDRESS="username@host.address"
PORT="21"
DESTINATION_FOLDER="/absolute/path/to/www/"

# Remove all files in the destination folder
ssh $FULL_HOST_ADDRESS -p $PORT "rm $DESTINATION_FOLDER/* ||:"

# Send the files to the destination folder
scp -P $PORT -r packages/frontend/dist/* $FULL_HOST_ADDRESS:$DESTINATION_FOLDER
