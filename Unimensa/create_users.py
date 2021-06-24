from app import db, users, plate, sandwiches, gridfs
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


"""piatto = [{"Name": "Carbonara"}]
add = plate.insert_many(piatto)"""

#result = plate.find()

#for item in result:
#    print(item)

#result = db.files.find()
#result = plate.delete_many({})

#for item in result:
#    print(item)

#data = db.fs.files.find()


#GridFSBucket = GridFSBuckets.find(db);


#result = users.delete_many({})


"""Aggiornare un singolo documento all'interno della collezione.
old_values = {"Surname": ""}
new_values = {"$set": {"Surname": ""}}
collection.update_one(old_values, new_values)

"Password": pbkdf2_sha256.hash("angelobianchi")

"""





"""panini = [
                  {"_id": uuid.uuid4().hex, "Name": "Panino", "Price": "0.20", "Type": "pane"},
                  {"_id": uuid.uuid4().hex, "Name": "Ciabatta", "Price": "0.30", "Type": "pane"},
                  {"_id": uuid.uuid4().hex, "Name": "Prosciutto Cotto", "Price": "1.00", "Type": "salume"},
                  {"_id": uuid.uuid4().hex, "Name": "Prosciutto Crudo", "Price": "1.00", "Type": "salume"},
                  {"_id": uuid.uuid4().hex, "Name": "Salame", "Price": "1.00", "Type": "salume"},
                  {"_id": uuid.uuid4().hex, "Name": "Bresaola", "Price": "1.00", "Type": "salume"},
                  {"_id": uuid.uuid4().hex, "Name": "Mozzarella", "Price": "0.50", "Type": "formaggio"},
                  {"_id": uuid.uuid4().hex, "Name": "Provola", "Price": "0.50", "Type": "formaggio"},
                  {"_id": uuid.uuid4().hex, "Name": "Cheddar", "Price": "0.50", "Type": "formaggio"},
                  {"_id": uuid.uuid4().hex, "Name": "Peperoni", "Price": "0.50", "Type": "contorno"},
                  {"_id": uuid.uuid4().hex, "Name": "Patatine", "Price": "0.50", "Type": "contorno"},
                  {"_id": uuid.uuid4().hex, "Name": "Melanzane", "Price": "0.50", "Type": "contorno"},
                  {"_id": uuid.uuid4().hex, "Name": "Petto di pollo", "Price": "1.00", "Type": "carne"},
                  {"_id": uuid.uuid4().hex, "Name": "Hamburger", "Price": "1.00", "Type": "carne"},
                  {"_id": uuid.uuid4().hex, "Name": "Salsiccia", "Price": "1.00", "Type": "carne"},
                  {"_id": uuid.uuid4().hex, "Name": "Maionese", "Price": "0.50", "Type": "salsa"},
                  {"_id": uuid.uuid4().hex, "Name": "Ketchup", "Price": "0.50", "Type": "salsa"},
                  {"_id": uuid.uuid4().hex, "Name": "Senape", "Price": "0.50", "Type": "salsa"}
]

add = sandwiches.insert_many(panini)"""


"""result = sandwiches.find()

for item in result:
    print(item)"""

#result = sandwiches.delete_many({})
