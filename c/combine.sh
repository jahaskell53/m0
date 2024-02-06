#!/bin/bash
#
# Combine terms to create  n-grams (for n=1,2,3) and then count and sort them

tr '\t' ' ' | tr -s ' '| paste -d ' ' - - - < <(tr '\n' ' ') | awk '{
    for(i=1; i<=NF; i++) {
        # 1-gram
        print $i
        if(i<NF) {
            # 2-gram
            print $i, $(i+1)
        }
        if(i<NF-1) {
            # 3-gram
            print $i, $(i+1), $(i+2)
        }
    }
}'| sort 