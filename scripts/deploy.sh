#!/usr/bin/env bash

# Get the .env as environment variables
export $(cat scripts/.env | xargs)

# Remove all files in the destination folder
ssh $FULL_HOST_ADDRESS -p $PORT "rm $DESTINATION_FOLDER/* ||:"

# Send the files to the destination folder
scp -P $PORT -r packages/frontend/dist/* $FULL_HOST_ADDRESS:$DESTINATION_FOLDER
