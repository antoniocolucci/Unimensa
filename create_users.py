from app import db, users, plate, sandwiches
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
add = users.insert_many(user)


result = users.find()
for item in result:
    print(item)"""


#add = plate.insert_many(piatto)

#result = plate.find()

#for item in result:
#    print(item)

#result = db.files.find()
#result = plate.delete_many({})

#for item in result:
#    print(item)


#result = users.delete_many({})


"""Aggiornare un singolo documento all'interno della collezione.
old_values = {"Surname": ""}
new_values = {"$set": {"Surname": ""}}
collection.update_one(old_values, new_values)

"Password": pbkdf2_sha256.hash("angelobianchi")

"""





panini = [
                  {"_id": uuid.uuid4().hex, "Name": "Panino", "Price": "0.20", "Type": "bread"},
                  {"_id": uuid.uuid4().hex, "Name": "Ciabatta", "Price": "0.30", "Type": "bread"},
                  {"_id": uuid.uuid4().hex, "Name": "Prosciutto Cotto", "Price": "1.00", "Type": "sausage"},
                  {"_id": uuid.uuid4().hex, "Name": "Prosciutto Crudo", "Price": "1.00", "Type": "sausage"},
                  {"_id": uuid.uuid4().hex, "Name": "Salame", "Price": "1.00", "Type": "sausage"},
                  {"_id": uuid.uuid4().hex, "Name": "Bresaola", "Price": "1.00", "Type": "sausage"},
                  {"_id": uuid.uuid4().hex, "Name": "Mozzarella", "Price": "0.50", "Type": "cheese"},
                  {"_id": uuid.uuid4().hex, "Name": "Provola", "Price": "0.50", "Type": "cheese"},
                  {"_id": uuid.uuid4().hex, "Name": "Cheddar", "Price": "0.50", "Type": "cheese"},
                  {"_id": uuid.uuid4().hex, "Name": "Peperoni", "Price": "0.50", "Type": "dish"},
                  {"_id": uuid.uuid4().hex, "Name": "Patatine", "Price": "0.50", "Type": "dish"},
                  {"_id": uuid.uuid4().hex, "Name": "Melanzane", "Price": "0.50", "Type": "dish"},
                  {"_id": uuid.uuid4().hex, "Name": "Petto di pollo", "Price": "1.00", "Type": "meat"},
                  {"_id": uuid.uuid4().hex, "Name": "Hamburger", "Price": "1.00", "Type": "meat"},
                  {"_id": uuid.uuid4().hex, "Name": "Salsiccia", "Price": "1.00", "Type": "meat"},
                  {"_id": uuid.uuid4().hex, "Name": "Maionese", "Price": "0.50", "Type": "sauce"},
                  {"_id": uuid.uuid4().hex, "Name": "Ketchup", "Price": "0.50", "Type": "sauce"},
                  {"_id": uuid.uuid4().hex, "Name": "Senape", "Price": "0.50", "Type": "sauce"}
]

add = sandwiches.insert_many(panini)



result = sandwiches.find()



for item in result:
    print(item)

#sandwiches.delete_one({'_id': name})


#result = sandwiches.delete_many({})

#cotoletta = [{"_id": uuid.uuid4().hex, "Name": "Provola", "Price": "1.00", "Type": "cheese"}]

#add = sandwiches.insert_many(cotoletta)
