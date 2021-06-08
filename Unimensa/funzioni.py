"""from flask import Flask, render_template, request, redirect, jsonify
from app import users
from passlib.hash import pbkdf2_sha256
from pymongo import MongoClient
from app import users


def login():
    user = users.find_one(
        {"Email": request.form.get("Email")}
    )
    if(user and pbkdf2_sha256.verify(request.form.get("Password"), user['Password'])):
        redirect('/Home')"""

