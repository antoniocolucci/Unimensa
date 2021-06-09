from flask import Flask, render_template, request, redirect, jsonify, url_for, session
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from passlib.hash import pbkdf2_sha256
from funzioni import *

client = MongoClient("mongodb://localhost:27017/")
db = client["unimensa"]
users = db["users"]
app = Flask(__name__)
app.secret_key = 'unimensakey'
cors = CORS(app)






@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        allusers = users
        login_user = allusers.find_one({"Email": request.form['Email']})
        if login_user:
            if pbkdf2_sha256.verify(request.form['Password'], login_user['Password']):
                session["_id"] = login_user["_id"]
                session["Type"] = login_user["Type"]
                return redirect('Home')
        return "Login error"
    return render_template('index.html')

@app.route('/logout', methods=['POST', 'GET'])
def logout():
    session.pop('_id', None)
    session.pop("Type", None)
    return redirect(url_for('index'))


@app.route('/Home', methods=['POST', 'GET'])
def home():
    if session["Type"] == "admin":
        return render_template('home_00.html')
    else:
        return render_template('Home.html')

@app.route('/myAccount')
def account():
    return render_template('Account.html')

@app.route('/Order')
def order():
    return render_template('Order.html')

@app.route('/Cartphone')
def cartphone():
    return render_template('Cart.html')








if __name__ == '__main__':
    app.secret_key = 'unimensa'
    app.run(debug=True)



""" if(user and pbkdf2_sha256.verify(request.form.get("Password"), user['Password'])):
            return jsonify({user})
        else:
            return jsonify({'error': 'Login Error'}), 400
            
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

            """