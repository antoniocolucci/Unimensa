from app import db, users
from passlib.hash import pbkdf2_sha256
import uuid



"""user = [

    {"_id": uuid.uuid4().hex, "Name": "Antonio", "Surname": "Colucci", "Email": "antoniocolucci@universita.it", "Password": pbkdf2_sha256.hash("antoniocolucci"), "Type": "user"},
    {"_id": uuid.uuid4().hex, "Name": "Antonio", "Surname": "Sarno", "Email": "antoniosarno@universita.it", "Password": pbkdf2_sha256.hash("antoniosarno"), "Type": "user"},
    {"_id": uuid.uuid4().hex, "Name": "Jonathan", "Surname": "De Michele", "Email": "jonathandemichele@universita.it", "Password": pbkdf2_sha256.hash("jonathandemichele"), "Type": "user"},
    {"_id": uuid.uuid4().hex, "Name": "Mario", "Surname": "Rossi", "Email": "mariorossi@docenti.universita.it", "Password": pbkdf2_sha256.hash("mariorossi"), "Type": "user"},
    {"_id": uuid.uuid4().hex, "Name": "Angelo", "Surname": "Bianchi", "Email": "angelobianchi@personale.it", "Password": pbkdf2_sha256.hash("angelobianchi"), "Type": "admin"}
]

# Add users to the database.
add = users.insert_many(user)"""




result = users.find()
for item in result:
    print(item)


#result = users.delete_many({})


"""Aggiornare un singolo documento all'interno della collezione.
old_values = {"Surname": ""}
new_values = {"$set": {"Surname": ""}}
collection.update_one(old_values, new_values)

"Password": pbkdf2_sha256.hash("angelobianchi")

"""



