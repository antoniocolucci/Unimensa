from flask import Flask, render_template, request, redirect, jsonify, url_for, session, json
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.utils import secure_filename
from passlib.hash import pbkdf2_sha256
from datetime import datetime
import uuid
import os


client = MongoClient("mongodb://localhost:27017/")
db = client["unimensa"]
users = db["users"]
plate = db['plate']
order = db['order']
sandwiches = db['sandwiches']
UPLOAD_FOLDER = '../Unimensa/static/images/mensa/'
app = Flask(__name__)
app.secret_key = 'unimensakey'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
cors = CORS(app)



@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        login_user = users.find_one({"Email": request.form['Email']})
        if login_user:
            if pbkdf2_sha256.verify(request.form['Password'], login_user['Password']):
                session["_id"] = login_user["_id"]
                session['Type'] = login_user['Type']
                return redirect('Home')
            return render_template('index.html', error=1)
        return render_template('index.html', error=2)
    return render_template('index.html')


@app.route('/logout', methods=['POST', 'GET'])
def logout():
    session.pop('_id', None)
    return redirect(url_for('index'))

@app.route('/Home', methods=['GET', 'POST'])
def home():
    user = users.find_one({'Type': 'admin'})
    if(user):
        if session['_id'] == user['_id']:
            if request.method == 'POST':
                namePlate = request.form['Name']
                id = uuid.uuid4().hex
                pricePlate = request.form['Price']
                section = request.form['Section_card']
                file = request.files['imgFile']
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                newCard = {'_id': id, 'Name': namePlate, 'Price': pricePlate, 'Section': section, 'Filename': filename}
                plate.insert_one(newCard)
                return render_template('home_00.html')
            else:
                return render_template('home_00.html')
        else:
            return render_template('Home.html')
    else:
        return render_template('Home.html')

@app.route('/LoadCard', methods=['GET', 'POST'])
def loadCard():
    if request.method == 'POST':
        plates = plate.find({'Section': request.form['Section_card']})
        if plates:
            list_plates = list(plates)
            result = {
                        'plates': list_plates,
                        'Type': session['Type']
            }
            return jsonify(result)
        else:
            return render_template('home_00.html')
    return render_template('home_00.html')


@app.route('/LoadSandwiches', methods=['GET', 'POST'])
def loadSandwiches():
    if request.method == 'POST':
        all_sandwiches = sandwiches.find({})
        if all_sandwiches:
            list_sandwiches = list(all_sandwiches)
            result = {
                        'sandwiches': list_sandwiches,
                        'Type': session['Type']
            }
            return jsonify(result)
        else:
            return render_template('home_00.html')
    return render_template('home_00.html')

@app.route('/DeleteCard', methods=['POST', 'GET'])
def deleteCard():
    if request.method == 'POST':
        data = request.get_data()
        name = data[5:]
        enc_name = name.decode("utf-8")
        plate.delete_one({'_id': enc_name})
        return render_template('home_00.html')
    return render_template('home_00.html')

@app.route('/DeleteSandwiches', methods=['POST', 'GET'])
def deleteSandwiches():
    if request.method == 'POST':
        data = request.get_data()
        name = data[5:]
        enc_name = name.decode("utf-8")
        sandwiches.delete_one({'_id': enc_name})
        return render_template('home_00.html')
    return render_template('home_00.html')

@app.route('/Order', methods=['POST', 'GET'])
def order():
    if request.method == 'POST':
        priceTot = 0
        data = request.get_json()
        dishes = []
        for element in data:
            price = element['price']
            user = users.find_one({'_id': session['_id']})
            if user:
                fullName = user['Name'] + ' ' + user['Surname']
                idUser = user['_id']
            if isinstance(price, float):
                priceTot = priceTot + price
                piatto = '' + str(element['quantity']) + ' - ' + element['name'] + ' (' + str(element['price']) + ')'
            else:
                if isinstance(price, int):
                    priceTot = priceTot + price
                    piatto = '' + str(element['quantity']) + ' - ' + element['name'] + ' (' + str(element['price']) + ')'
                else:
                    priceTot = priceTot + float(price[:-1])
                    piatto = '' + str(element['quantity']) + ' - ' + element['name'] + ' (' + element['price'] + ')'
            dishes.append(piatto)
            today = datetime.today().strftime('%Y-%m-%d-%H:%M:%S')

        db.order.insert_one({'_id': uuid.uuid4().hex, 'Plates': dishes, 'UserName': fullName, 'User_id': idUser, 'Data': today, 'PriceTot': priceTot, 'State': 'open'})
        return render_template('Home.html')

    return render_template('Home.html')

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

            else:
                user_type = 'user'
                if email_user.find('personale.universita.it') != -1:
                    user_type = 'admin'
                users.insert_one({'_id': uuid.uuid4().hex, 'Name': request.form['Name'], 'Surname': request.form['Surname'], 'Email': request.form['Email'], 'Password': pbkdf2_sha256.hash(request.form['Password']), 'Type': user_type})
                return redirect(url_for('index'))

    return render_template('signin.html')

@app.route('/LoadOrder', methods=['POST', 'GET'])
def loadOrder():
    if request.method == 'POST':
        if session['Type'] == 'admin':
            orders = db.order.find({'State': 'open'})
            if orders:
                list_orders = list(orders)
                result = {
                    'orders': list_orders,
                    'Type': session['Type']
                }
                return jsonify(result)
            return render_template('Order.html')
        else:
            orders = db.order.find({'User_id': session['_id']})
            if orders:
                list_orders = list(orders)
                result = {
                    'orders': list_orders,
                    'Type': session['Type']
                }
                return jsonify(result)
            return render_template('Order.html')
    return render_template('Order.html')



@app.route('/closeOrder', methods=['POST', 'GET'])
def closeOrder():
    if request.method == 'POST':
        data = request.get_data()
        idOrder = data[3:]
        enc_id = idOrder.decode("utf-8")
        query = {"_id": enc_id}
        oneOrder = db.order.find_one(query)
        new_values = {"$set": {"State": "closed"}}
        db.order.update_one(query, new_values)
    return render_template('Order.html')


@app.route('/addSand', methods=['POST', 'GET'])
def addSand():
    if request.method == 'POST':
        nameSand = request.form['sand_name']
        print(nameSand)
        priceSand = request.form['sand_price']
        print(priceSand)
        typeSand = request.form['typeSand']
        print(typeSand)
        sandwiches.insert_one({'_id': uuid.uuid4().hex, 'Name': nameSand, 'Price': priceSand, 'Type': typeSand})
        return render_template('home_00.html')
    return render_template('home_00.html')


if __name__ == '__main__':
    app.secret_key = 'unimensakey'
    app.run(debug=True)
