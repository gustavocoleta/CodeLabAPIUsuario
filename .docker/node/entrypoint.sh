#!/bin/bash

echo "Container started"

npm install

npm run migration:run

npm run start:debug