from app import db, users, plate, sandwiches
from passlib.hash import pbkdf2_sha256
import uuid



user = [

    {"_id": uuid.uuid4().hex, "Name": "Antonio", "Surname": "Colucci", "Email": "antoniocolucci@studenti.universita.it", "Password": pbkdf2_sha256.hash("antonio"), "Type": "user"},
    {"_id": uuid.uuid4().hex, "Name": "Antonio", "Surname": "Sarno", "Email": "antoniosarno@studenti.universita.it", "Password": pbkdf2_sha256.hash("italia"), "Type": "user"},
    {"_id": uuid.uuid4().hex, "Name": "Jonathan", "Surname": "De Michele", "Email": "jonathandemichele@studenti.universita.it", "Password": pbkdf2_sha256.hash("jonathan"), "Type": "user"},
    {"_id": uuid.uuid4().hex, "Name": "Mario", "Surname": "Rossi", "Email": "mariorossi@personale.universita.it", "Password": pbkdf2_sha256.hash("mario"), "Type": "admin"},
    {"_id": uuid.uuid4().hex, "Name": "Angelo", "Surname": "Bianchi", "Email": "angelobianchi@docenti.universita.it", "Password": pbkdf2_sha256.hash("angelo"), "Type": "user"}
]

# Add users to the database.
add = users.insert_many(user)

meal = [

    {"_id": uuid.uuid4().hex, "Name": "Pizza + Coca Cola", "Price": "6", "Section": "choose_plate", "Filename": "pizza2.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Carbonara", "Price": "5", "Section": "first_plate", "Filename": "carbonara.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Pesto", "Price": "6", "Section": "first_plate", "Filename": "pesto.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Polpette", "Price": "4", "Section": "second_plate", "Filename": "polpette.png"},
    {"_id": uuid.uuid4().hex, "Name": "Salmone", "Price": "4", "Section": "second_plate", "Filename": "salmone.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Margherita", "Price": "4", "Section": "pizza", "Filename": "pizza.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Insalata", "Price": "3", "Section": "side_dish", "Filename": "insalata.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Coca Cola", "Price": "2", "Section": "drink", "Filename": "cocacola.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Acqua", "Price": "1", "Section": "drink", "Filename": "acqua.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Tiramisù", "Price": "2", "Section": "desserts", "Filename": "tiramisu.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Mela", "Price": "0.50", "Section": "fruits", "Filename": "mela.jpg"},
    {"_id": uuid.uuid4().hex, "Name": "Arancia", "Price": "0.50", "Section": "fruits", "Filename": "arancia.jpg"}
]


# Add plates into the database.
add = plate.insert_many(meal)


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

# Add ingredients of sandwiches into the database.
add = sandwiches.insert_many(panini)

