#!/bin/bash

# The URL is the first command-line argument
#!/bin/bash

# The first command-line argument is the URL
URL=$1

# Process input from stdin
tr '\t' ' ' | tr -s ' ' | sort | uniq -c | awk -v url="$URL" '{
    # build the term sequence with the second field
    term_sequence = $2;
    
    # loop through the rest of the fields to build the term sequence
    for(i=3; i<=NF; i++) {
        term_sequence = term_sequence " " $i;
    }
    
    printf "%s | %d | %s\n", term_sequence, $1, url;
}' 
