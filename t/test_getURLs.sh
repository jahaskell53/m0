#!/bin/bash
#!/bin/bash

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/..$R_FOLDER" || exit 1

DIFF=${DIFF:-diff}

url="https://cs.brown.edu/courses/csci1380/sandbox/1/level_1a/index.html"

get_urls_output=$(cat "$T_FOLDER/d/d0.txt" | c/getURLs.js $url | sort)

url_counts=$(echo "$get_urls_output" | uniq -c)

if echo "$url_counts" | grep -q -E '[[:space:]]2[[:space:]]'; then
    echo "$0 failure: Duplicate URLs found in getURLs.js output"
else
    echo "$0 success: No duplicate URLs found in getURLs.js output"
fi
