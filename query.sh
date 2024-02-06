#!/bin/bash

# Provided an appropriate index, the query could be implemented using grep
# along  with appropriate stemming of the input strings and stripping of the 
# index metadata

# echo "$@" | cat
file="d/global-index.txt" 
grep -i $(echo $1 | c/stem.js) "$file"
