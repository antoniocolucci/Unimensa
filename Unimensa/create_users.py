from app import db, users
from passlib.hash import pbkdf2_sha256
import uuid

"""user = [

    {"_id": uuid.uuid4().hex, "Name": "Antonio", "Surname": "Colucci", "Email": "antoniocolucci@universita.it", "Password": pbkdf2_sha256.hash("antoniocolucci")},
    {"_id": uuid.uuid4().hex, "Name": "Antonio", "Surname": "Sarno", "Email": "antoniosarno@universita.it", "Password": pbkdf2_sha256.hash("antoniosarno")},
    {"_id": uuid.uuid4().hex, "Name": "Jonathan", "Surname": "De Michele", "Email": "jonathandemichele@universita.it", "Password": pbkdf2_sha256.hash("jonathandemichele")},
    {"_id": uuid.uuid4().hex, "Name": "Mario", "Surname": "Rossi", "Email": "mariorossi@docenti.universita.it", "Password": pbkdf2_sha256.hash("mariorossi")},
    {"_id": uuid.uuid4().hex, "Name": "Angelo", "Surname": "Bianchi", "Email": "angelobianchi@personale.it", "Password": pbkdf2_sha256.hash("angelobianchi")}
]

add = users.insert_many(user)"""




result = users.find()
for item in result:
    print(item)


#result = users.delete_many({})


"""Aggiornare un singolo documento all'interno della collezione.
old_values = {"Surname": "Insigne"}
new_values = {"$set": {"Surname": "Immobile"}}
collection.update_one(old_values, new_values)"""



