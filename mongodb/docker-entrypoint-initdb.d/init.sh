#!/bin/bash

FILE=/data/db/.mongodb_init_complete

if [[ -f "${FILE}" ]]; then
    echo "MongoDB initiation has been completed."
else
    # Create a MongoDB user
    mongosh -u root -p root <<EOF
    use my_db
    db.createUser({
      user: "user",
      pwd: "user",
      roles: [ { 
        role: "readWrite",
        db: "my_db",
      } ]
    })
    db.createCollection("users")
    db.users.insertOne({
      name: "John Doe",
      email: "john@example.com"
    })
EOF
  # Create file
  touch /data/db/.mongodb_init_complete

  echo "The creation of the MongoDB user and database is complete."
fi
