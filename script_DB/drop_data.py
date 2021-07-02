from app import db, users, plate, sandwiches, order
from passlib.hash import pbkdf2_sha256
import uuid


# Drop data of users.
result_users = users.find()
result_users = users.delete_many({})

# Drop data of plates.
result_plates = plate.find()
result_plates = plate.delete_many({})

# Drop data of ingredients of sandwiches.
result_sandwiches = sandwiches.find()
result_sandwiches = sandwiches.delete_many({})

# Drop orders.
result_orders = db.order.find()
result_orders = db.order.delete_many({})
