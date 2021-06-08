from flask import Flask, render_template, request, redirect, jsonify, url_for, session
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from passlib.hash import pbkdf2_sha256

client = MongoClient("mongodb://localhost:27017/")
db = client["unimensa"]
users = db["users"]
app = Flask(__name__)
cors = CORS(app)

#CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/', methods=["GET", "POST"])
def index():
    if request.method == 'POST':
        usr_email = request.form['Email']
        usr_pwd = request.form['Password']
        user = users.find_one({'Email': usr_email}).count()
        print(user)
        if user > 0:
            user_rs = users.find_one({'Email': usr_email})
            pwd = user_rs['Password']
            print(pwd)
            #if check_password_hash(pwd, usr_pwd):
            session['sessionusername'] = usr_email
            return redirect('/Home')
            #else:
             #   error = 'Invalid login'
             #   return render_template('index.html', error=error)
        else:
            error = 'Username not found'
            return render_template('index.html', error=error)
    return render_template('index.html')


@app.route('/Home')
def home():
    return render_template('Home.html')













""" if(user and pbkdf2_sha256.verify(request.form.get("Password"), user['Password'])):
            return jsonify({user})
        else:
            return jsonify({'error': 'Login Error'}), 400"""