#!/bin/bash

# groep4-prd keeps its data
for db in groep4-dev groep4-tst groep4-acc
do
    echo "Dropping $db"
    mongo $db --eval "db.dropDatabase()"
    echo "Restoring $db"
    mongorestore -d $db seed
done
