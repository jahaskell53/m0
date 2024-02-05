#!/bin/bash
# Invert index to create a mapping from terms to URLs containing that term
# The details of the index structure can be seen in the test cases

URL=$1
# format of input
while IFS=' ' read -r term count; do
    echo "$term | $count | $URL"
done    