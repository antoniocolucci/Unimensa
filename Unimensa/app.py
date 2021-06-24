from flask import Flask, render_template, request, redirect, jsonify, url_for, session, json
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from passlib.hash import pbkdf2_sha256
from django.http import HttpRequest
import uuid
import os
import gridfs

client = MongoClient("mongodb://localhost:27017/")
db = client["unimensa"]
users = db["users"]
plate = db['plate']
UPLOAD_FOLDER = '../Unimensa/static/images/mensa/'
app = Flask(__name__)
app.secret_key = 'unimensakey'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
cors = CORS(app)
#newCard ={'Name': '', 'Price': '', 'Ingredients': '', 'Filename': ''}

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        login_user = users.find_one({"Email": request.form['Email']})
        if login_user:
            if pbkdf2_sha256.verify(request.form['Password'], login_user['Password']):
                session["_id"] = login_user["_id"]
                #session["Type"] = login_user["Type"]
                return redirect('Home')
            return render_template('index.html', error=1)
        return render_template('index.html', error=2)
    return render_template('index.html')


@app.route('/logout', methods=['POST', 'GET'])
def logout():
    session.pop('_id', None)
    return redirect(url_for('index'))

@app.route('/api/Home', methods=['GET', 'POST'])
def loadCard():
    if request.method == 'POST':
        section = request.form['section']
        plates = plate.find({'Section': section})
        if plates:
            list_plates = list(plates)
            return jsonify(list_plates)
        else:
            return render_template('home_00.html')
    return render_template('home_00.html')


@app.route('/Home', methods=['GET', 'POST'])
def home():
    user = users.find_one({'Type': 'admin'})
    if session["_id"] == user['_id']:
        if request.method == 'POST':
            data = json.loads(request.data)

            namePlate = request.form['Name']
            id = uuid.uuid4().hex
            pricePlate = request.form['Price']
            ingredients = request.form['Ingredients']
            section = data.get('section')
            file = request.files['imgFile']
            print('file ok')
            filename = secure_filename(file.filename)
            print('filename ok')
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print('filesave ok')
            newCard = {'_id': id, 'Name': namePlate, 'Price': pricePlate, 'Ingredients': ingredients, 'Section': section, 'Filename': filename}
            print('newCard ok')
            plate.insert_one(newCard)
            print('insert ok')
            return render_template('home_00.html')
        else:
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

@app.route('/signin', methods=['POST', 'GET'])
def signin():
    if request.method == 'POST':
        email_user = request.form['Email']
        signin_user = users.find_one({"Email": email_user})
        if signin_user:
            return render_template('signin.html', error=3)
        elif email_user.find('studenti.universita.it') == -1 and email_user.find('docenti.universita.it') == -1 and email_user.find('personale.universita.it') == -1:
            return render_template('signin.html', error=4)
        else:
            if request.form['Email'] == '' or request.form['Name'] == '' or request.form['Surname'] == '' or request.form['Password'] == '' or request.form['checkPassword'] == '':
                return render_template('signin.html', error=5)
            elif request.form['Password'] != request.form['checkPassword']:
                return render_template('signin.html', error=6)
            #Remember check easy password
            else:
                user_type = 'user'
                if email_user.find('personale.universita.it') != -1:
                    user_type = 'admin'
                users.insert_one({'_id': uuid.uuid4().hex, 'Name': request.form['Name'], 'Surname': request.form['Surname'], 'Email': request.form['Email'], 'Password': pbkdf2_sha256.hash(request.form['Password']), 'Type': user_type})
                return redirect(url_for('index'))

    return render_template('signin.html')


if __name__ == '__main__':
    app.secret_key = 'unimensakey'
    app.run(debug=True)
