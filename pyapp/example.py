import pymongo

client = pymongo.MongoClient('mongodb://user:user@mongodb:27017/my_db?connectTimeoutMS=30000', 27017)

db = client['my_db']
collection = db['users']

all_documents = collection.find()

# Print each document
for document in all_documents:
    print(document)

# Close the MongoDB connection when done
client.close()