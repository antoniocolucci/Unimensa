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
        plates = plate.find_one({'Ingredients': 'f'})
        print(plates)
        if plates is not None:
            #list_plates = list(plates)
            return jsonify(plates)
        else:
            return render_template('home_00.html')
    return render_template('home_00.html')


@app.route('/Home', methods=['GET', 'POST'])
def home():
    user = users.find_one({'Type': 'admin'})
    if session["_id"] == user['_id']:
        if request.method == 'POST':
            namePlate = request.form['Name']
            print(namePlate)
            if namePlate == None:
                print('Sono passato da qui')
                return render_template('home_00.html')
            else:
                pricePlate = request.form['Price']
                ingredients = request.form['Ingredients']
                id = uuid.uuid4().hex
                file = request.files['imgFile']
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                newCard = {'_id': id, 'Name': namePlate, 'Price': pricePlate, 'Ingredients': ingredients, 'Filename': filename}
                plate.insert_one(newCard)
                return render_template('home_00.html')

            """data = db.fs.files.find_one({'filename': name})
            my_id = data['_id']
            outputdata = fs.get(my_id).read()
            download_location = '../Unimensa/static/images/mensa/' + name
            output = open(download_location, 'wb')
            output.write(outputdata)
            output.close()
            print("Download complete")"""
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
