#!/usr/bin/env bash

# Update the "fixed bikes" stats:
#
# * Fetch our public bike kitchen stats Google sheet as CSV
# * Extract the cell for number of fixed bikes
# * Update "stats.json"
#
# This script is meant to be run weekly in CI, and then auto-push
# a commit with updated stats.
#
# Dependencies: jq, curl, moreutils (for sponge)

script_dir="${0%/*}"
stats="${script_dir}/stats.json"
url="https://docs.google.com/spreadsheets/d/e/2PACX-1vTAb0c8yvAgAzAfvy1obxFJwP_kxqA8ln1jAr5r1YNCzEQ59EQUxPqJnzjBDkVDlIjOQG8sMTRj0_CK/pub?gid=79885722&single=true&output=csv"

# Grab first field from first line of CSV file
bikes_fixed=$(curl -fsSL "$url" | head -n1 | cut -d',' -f1)

jq \
    --argjson bikes_fixed "$bikes_fixed" \
    --arg date "$(date +%F)" \
    '.bikes_fixed = $bikes_fixed | .date = (now|strftime("%F"))' \
    "$stats" | sponge "$stats"
