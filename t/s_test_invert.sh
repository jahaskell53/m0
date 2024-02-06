# If the words are sorted alphabetically
#If the links are sorted by frequency

#!/bin/bash
#!/bin/bash

T_FOLDER=${T_FOLDER:-t}
R_FOLDER=${R_FOLDER:-}

cd "$(dirname "$0")/..$R_FOLDER" || exit 1

input_data_file="test_data_words_sorted.txt"

cat "$input_data_file" | c/merge.js d/global-index.txt > d/temp-global-index.txt
mv d/temp-global-index.txt d/global-index.txt

sort d/global-index.txt > d/sorted-global-index.txt

if diff -q d/sorted-global-index.txt "$T_FOLDER/expected_sorted_global_index.txt" > /dev/null;
then
    echo "$0 success: global index is sorted alphabetically"
else
    echo "$0 failure: global index is not sorted alphabetically"
fi



