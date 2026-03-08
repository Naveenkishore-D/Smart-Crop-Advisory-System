from flask import Flask, render_template, request

app = Flask(_name_)

def recommend_crop(soil, temp, rain):
    
    if soil == "clay" and rain > 100:
        return "Rice"
    
    elif soil == "sandy" and temp > 25:
        return "Groundnut"
    
    elif soil == "loamy":
        return "Wheat"
    
    else:
        return "Maize"

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def predict():

    soil = request.form['soil']
    temperature = float(request.form['temperature'])
    rainfall = float(request.form['rainfall'])

    crop = recommend_crop(soil, temperature, rainfall)

    return render_template("result.html", crop=crop)

if _name_ == "_main_":
    app.run(debug=True)