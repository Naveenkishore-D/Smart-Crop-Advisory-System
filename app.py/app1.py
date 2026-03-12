from flask import Flask,render_template,request,redirect,session
import sqlite3

from services.weather_service import get_weather
from services.prediction_service import predict_crop

app=Flask(__name__)
app.secret_key="smartcropkey"

# Database connection
def get_db():

    conn=sqlite3.connect("database.db")
    conn.row_factory=sqlite3.Row
    return conn


@app.route("/")
def home():
    return render_template("login.html")


# Registration
@app.route("/register",methods=["GET","POST"])
def register():

    if request.method=="POST":

        name=request.form["name"]
        email=request.form["email"]
        password=request.form["password"]

        conn=get_db()
        conn.execute("INSERT INTO Farmers(name,email,password) VALUES(?,?,?)",
                     (name,email,password))
        conn.commit()

        return redirect("/")

    return render_template("register.html")


# Login
@app.route("/login",methods=["POST"])
def login():

    email=request.form["email"]
    password=request.form["password"]

    conn=get_db()

    user=conn.execute("SELECT * FROM Farmers WHERE email=? AND password=?",
                      (email,password)).fetchone()

    if user:

        session["user"]=user["id"]

        return redirect("/dashboard")

    return "Invalid credentials"


# Dashboard
@app.route("/dashboard")
def dashboard():

    weather=get_weather("Chennai")

    return render_template("dashboard.html",
                           weather=weather)


# Prediction
@app.route("/predict",methods=["POST"])
def predict():

    N=float(request.form["N"])
    P=float(request.form["P"])
    K=float(request.form["K"])
    temp=float(request.form["temperature"])
    humidity=float(request.form["humidity"])
    ph=float(request.form["ph"])
    rainfall=float(request.form["rainfall"])

    crop=predict_crop([N,P,K,temp,humidity,ph,rainfall])

    return render_template("result.html",crop=crop)


if __name__=="__main__":
    app.run(debug=True)