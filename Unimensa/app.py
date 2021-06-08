from flask import Flask, render_template, request, redirect, jsonify, url_for
from flask_cors import CORS
from pymongo import MongoClient
from passlib.hash import pbkdf2_sha256

client = MongoClient("mongodb://localhost:27017/")
db = client["unimensa"]
users = db["users"]
app = Flask(__name__)
cors = CORS(app)

#CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/', methods=["GET", "POST"])
def index():
    login()
    return render_template('index.html')



@app.route('/Home')
def home():
    return render_template('Home.html')


def login():
    user = users.find_one(
        {"Email": request.form.get("Email")}
    )
    if(user and pbkdf2_sha256.verify(request.form.get("Password"), user['Password'])):
        return jsonify({user})
    else:
        return jsonify({'error': 'Login Error'}), 400