#!/bin/bash

finalUrl=$(curl -sL -o /dev/null -w %{url_effective} "$1")

# Append the final URL to visited.txt (not sure if necessary)
# echo "$finalUrl" >> d/visited.txt
# Append the original URL to visited.txt
echo $1 >> d/visited.txt
curl -sL "$1" |
  tee >(c/getURLs.js "$finalUrl" | grep -vxf d/visited.txt >>d/urls.txt) |
  c/getText.js
