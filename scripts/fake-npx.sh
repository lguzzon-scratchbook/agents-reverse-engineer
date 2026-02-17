#!/bin/bash
# Fake npx wrapper for VHS demo recording
# Simulates the real npx "Ok to proceed?" prompt, then runs the local CLI with no args
echo "Need to install the following packages:"
echo "  agents-reverse-engineer@latest"
echo -n "Ok to proceed? (y) "
read -r
exec node /home/pascal/wks/agents-reverse-engineer/dist/cli/index.js
