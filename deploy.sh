#!/bin/bash

CONTAINER_NAME="dematade-trade-panel"
IMAGE_NAME="demamtade-trade-panel"
SRC=/home/ubuntu/dematade-userpanel-updated

echo "=================="
echo "|Pulling the code|"
echo "=================="
echo ""
cd $SRC && git pull
echo ""

echo "======================="
echo "|Building the codebase|"
echo "======================="
echo ""
docker build -t $IMAGE_NAME .
echo ""
echo "==========================="
echo "|DEPLOYING THE APPLICATION|"
echo "==========================="
echo ""


docker rm -f $CONTAINER_NAME
docker run -d -p 9090:3000 --restart always --name $CONTAINER_NAME $IMAGE_NAME


echo ""
echo "==============================================="
echo "| $IMAGE_NAME APPLICATION DEPLOYMENT COMPLETED|"
echo "==============================================="
echo ""
