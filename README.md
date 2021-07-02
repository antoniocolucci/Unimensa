# Unimensa
![Alt text](static/images/logo/logo.jpeg "Logo Unimensa")
 Unimensa is a Progressive Web App made by **Antonio Colucci**, **Antonio Sarno** and **Jonathan De Michele** for the project of Web Technologies (University of Naples Parthenope).
 
 
The purpose of the app is to optimize the management of a university canteen and to speed up the order of meals.
The app consists of a client side and a server side.

## The functionalities of the chef:
* The chef can upload the dishes by filling in a form with name, price and an image of the dish.
* The chef can view all the orders placed by the students and professors and close them when they are completed.

## The functionalities of the students and professors:
* Students can choose the dishes or, in the sandwich section, they have the possibility to compose a sandwich with their favourite ingredients.
* Students can view the orders placed and check their status. If the status is closed it means that the order has been completed, otherwise if the status is open it means that   the order is in preparation.


## How to install Unimensa?
1. Create a virtual environment(venv) by terminal: **> py -m venv venv**
2. Move to the folder venv/Scripts: **> cd venv/Scripts**
3. Now activate the virtual environment writing in the terminal "activate": **> activate**
4. Go to project folder and install requirements by requirements.txt file: **> pip install -r requirements.txt**
5. Make sure the python interpreter is configured correctly.
6. Install MongoDB for your operating system.
7. If you want to populate the database with users and dishes, you can execute the file "data_entry.py" located in the folder "script_DB", otherwise you can create users and upload dishes in the app.
8. To run the application you can use the command: **> flask run -h 0.0.0.0**
9. Now you can login, but if you don't have an account, you can create it on the registration page. **To simulate university emails you need to register with one of the following emails:
* **Student: nomeutente @studenti.universita.it**
* **Chef: nomeutente @personale.universita.it**
* **Professor: nomeutente @docenti.universita.it**
10. Only with ...@personale.universita.it you have the possibility to upload dishes, while with the emails of students and professors you can view the dishes uploaded by the chef.

