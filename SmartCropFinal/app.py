"""
app.py — Smart Crop Advisory System (FINAL)
Complete Flask Application with ML, Weather API, Auth, Admin
"""

from flask import Flask, render_template, request, redirect, url_for, session, jsonify, flash
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3, pickle, numpy as np, requests, os
from datetime import datetime
from functools import wraps

app = Flask(__name__)
app.secret_key = 'smartcrop_2024_secure_key_xyz'

BASE_DIR  = os.path.dirname(os.path.abspath(__file__))
DB_PATH   = os.path.join(BASE_DIR, 'database.db')
MODEL_PATH= os.path.join(BASE_DIR, 'model.pkl')

WEATHER_API_KEY  = 'demo_key'   # ← Replace with openweathermap.org free API key
WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

# ── Load ML Model ──────────────────────────────────────────────
def load_model():
    try:
        with open(MODEL_PATH, 'rb') as f:
            return pickle.load(f)
    except:
        return None

model_data = load_model()

# ── Crop Info Dictionary ───────────────────────────────────────
CROP_INFO = {
    'rice':        {'emoji':'🌾','season':'Kharif','duration':'90-150 days','market_price':'₹1800-2200/quintal','fertilizer':'Apply NPK 120:60:60 kg/ha. Use Urea in 3 splits. Add Zinc Sulfate 25 kg/ha.','irrigation':'Maintain 2-5 cm standing water during vegetative stage. Drain 10 days before harvest.'},
    'maize':       {'emoji':'🌽','season':'Kharif/Rabi','duration':'80-110 days','market_price':'₹1500-1800/quintal','fertilizer':'Apply NPK 100:60:40 kg/ha. Top dress Urea at knee height stage.','irrigation':'Critical irrigation at silking and grain fill. Avoid waterlogging at all stages.'},
    'chickpea':    {'emoji':'🫘','season':'Rabi','duration':'90-100 days','market_price':'₹4000-5000/quintal','fertilizer':'Apply Phosphorus 40 kg/ha. Use Rhizobium seed treatment. Minimal nitrogen needed.','irrigation':'Pre-sowing irrigation essential. One light irrigation at flowering if dry.'},
    'kidneybeans': {'emoji':'🫘','season':'Kharif','duration':'60-70 days','market_price':'₹5000-6000/quintal','fertilizer':'Apply NPK 20:60:40 kg/ha. Rhizobium seed treatment recommended for yield.','irrigation':'Needs moisture at flowering and pod filling stages. Avoid waterlogging.'},
    'pigeonpeas':  {'emoji':'🌿','season':'Kharif','duration':'150-180 days','market_price':'₹5500-6500/quintal','fertilizer':'Apply Phosphorus 50 kg/ha with Rhizobium inoculation before sowing.','irrigation':'Drought tolerant crop. Irrigate only during extended dry spells.'},
    'mothbeans':   {'emoji':'🫘','season':'Kharif','duration':'65-75 days','market_price':'₹4000-5000/quintal','fertilizer':'Minimal fertilizer needed. Apply Phosphorus 20 kg/ha for good nodulation.','irrigation':'Highly drought tolerant. 1-2 irrigations at critical stages sufficient.'},
    'mungbean':    {'emoji':'🌱','season':'Kharif/Zaid','duration':'60-65 days','market_price':'₹6000-7500/quintal','fertilizer':'Apply NPK 20:40:20 kg/ha. Use Rhizobium seed treatment for best results.','irrigation':'Needs moisture at flowering and pod development stage only.'},
    'blackgram':   {'emoji':'🫘','season':'Kharif/Rabi','duration':'65-70 days','market_price':'₹5000-6500/quintal','fertilizer':'Apply Phosphorus 40 kg/ha. Rhizobium inoculation boosts yield significantly.','irrigation':'Critical irrigation at pod filling. Total 3-4 irrigations needed.'},
    'lentil':      {'emoji':'🌿','season':'Rabi','duration':'85-90 days','market_price':'₹5000-6000/quintal','fertilizer':'Apply NPK 20:40:20 kg/ha. Rhizobium inoculation is essential for this crop.','irrigation':'1-2 light irrigations at pre-flowering and pod filling stages.'},
    'pomegranate': {'emoji':'🍎','season':'Perennial','duration':'Perennial','market_price':'₹4000-8000/quintal','fertilizer':'Apply NPK 250:125:125 g/plant. Split into 2 doses annually for best growth.','irrigation':'Drip irrigation preferred. Critical at flowering and fruit development stages.'},
    'banana':      {'emoji':'🍌','season':'Year-round','duration':'11-14 months','market_price':'₹1500-2500/quintal','fertilizer':'Apply NPK 200:60:300 g/plant. High potassium demand for good fruit quality.','irrigation':'Needs 75-100 mm water/week. Drip irrigation saves 30% water consumption.'},
    'mango':       {'emoji':'🥭','season':'Summer','duration':'Perennial','market_price':'₹2000-5000/quintal','fertilizer':'Young trees: 100g N, 50g P, 100g K per tree. Increase dose yearly.','irrigation':'Pre-flowering irrigation is critical. Avoid irrigation at fruit maturity stage.'},
    'grapes':      {'emoji':'🍇','season':'Rabi','duration':'Perennial','market_price':'₹3000-8000/quintal','fertilizer':'Apply NPK 50:50:100 g/vine. Zinc and Boron micronutrients are very important.','irrigation':'Drip irrigation at 60% ETc. Deficit irrigation improves berry quality.'},
    'watermelon':  {'emoji':'🍉','season':'Zaid/Summer','duration':'70-90 days','market_price':'₹1000-2000/quintal','fertilizer':'Apply NPK 80:40:60 kg/ha. Side dress with Nitrogen at fruit set stage.','irrigation':'Critical at vine development and fruit filling. Reduce water at maturity.'},
    'muskmelon':   {'emoji':'🍈','season':'Zaid/Summer','duration':'70-90 days','market_price':'₹1500-2500/quintal','fertilizer':'Apply NPK 80:60:60 kg/ha. Foliar micronutrient spray beneficial at fruiting.','irrigation':'Drip irrigation is best. Reduce water at fruit ripening for better sweetness.'},
    'apple':       {'emoji':'🍎','season':'Summer/Autumn','duration':'Perennial','market_price':'₹5000-12000/quintal','fertilizer':'Apply NPK 70:35:70 g/tree in first year, increasing the dose annually.','irrigation':'Critical at flowering and fruit development. Sprinkler irrigation preferred.'},
    'orange':      {'emoji':'🍊','season':'Winter','duration':'Perennial','market_price':'₹2500-4000/quintal','fertilizer':'Apply NPK 100:50:100 g/tree. Split in 3 doses per year with micronutrients.','irrigation':'Drip irrigation at 60-80 liters/tree/day during summer months.'},
    'papaya':      {'emoji':'🍈','season':'Year-round','duration':'9-11 months','market_price':'₹800-1500/quintal','fertilizer':'Apply NPK 100:60:100 g/plant per month. Needs regular and consistent feeding.','irrigation':'Weekly irrigation required. Very susceptible to waterlogging — avoid it.'},
    'coconut':     {'emoji':'🥥','season':'Perennial','duration':'Perennial','market_price':'₹10000-15000/1000 nuts','fertilizer':'Apply NPK 100:40:140 g/palm with organic manure 20 kg per year minimum.','irrigation':'Basin irrigation in dry months. Water table very critical for coconut growth.'},
    'cotton':      {'emoji':'🌿','season':'Kharif','duration':'150-180 days','market_price':'₹5500-6500/quintal','fertilizer':'Apply NPK 120:60:40 kg/ha in 3 splits. Boron foliar spray at squaring stage.','irrigation':'Critical at squaring, flowering and boll development. Total 6-8 irrigations.'},
    'jute':        {'emoji':'🌿','season':'Kharif','duration':'100-120 days','market_price':'₹3500-4500/quintal','fertilizer':'Apply NPK 80:40:40 kg/ha. Top dress with Nitrogen at 30 days after sowing.','irrigation':'Rainfed crop. Adequate soil moisture during germination is very critical.'},
    'coffee':      {'emoji':'☕','season':'Perennial','duration':'Perennial','market_price':'₹15000-25000/quintal','fertilizer':'Apply NPK 100:60:100 g/plant in 2-3 splits annually. Shade management important.','irrigation':'Critical during flowering and berry development. Needs 50-60 mm/month water.'},
}

# ── Database Init ──────────────────────────────────────────────
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS farmers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL, email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL, phone TEXT,
        location TEXT, land_area REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    c.execute('''CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        farmer_id INTEGER NOT NULL,
        nitrogen REAL, phosphorus REAL, potassium REAL,
        temperature REAL, humidity REAL, ph REAL, rainfall REAL,
        predicted_crop TEXT NOT NULL, confidence REAL,
        fertilizer_advice TEXT, irrigation_advice TEXT,
        location TEXT, predicted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (farmer_id) REFERENCES farmers(id))''')
    c.execute('''CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL, password TEXT NOT NULL)''')
    c.execute('INSERT OR IGNORE INTO admin (username, password) VALUES (?,?)',
              ('admin', generate_password_hash('admin123')))
    conn.commit(); conn.close()

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ── Auth Decorators ────────────────────────────────────────────
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'farmer_id' not in session:
            flash('Please login to continue.', 'warning')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'admin_id' not in session:
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated

# ── Weather Functions ──────────────────────────────────────────
def get_weather(city):
    demo = {'city': city or 'Your Location','temperature':28.5,'feels_like':31.2,
            'humidity':72,'wind_speed':3.5,'description':'Partly Cloudy',
            'icon':'02d','pressure':1012,'visibility':10,'error':None}
    if not city or WEATHER_API_KEY == 'demo_key':
        return demo
    try:
        r = requests.get(f"{WEATHER_BASE_URL}/weather?q={city}&appid={WEATHER_API_KEY}&units=metric", timeout=5)
        if r.status_code == 200:
            d = r.json()
            return {'city':d['name'],'temperature':round(d['main']['temp'],1),
                    'feels_like':round(d['main']['feels_like'],1),'humidity':d['main']['humidity'],
                    'wind_speed':round(d['wind']['speed'],1),'description':d['weather'][0]['description'].title(),
                    'icon':d['weather'][0]['icon'],'pressure':d['main']['pressure'],
                    'visibility':d.get('visibility',0)//1000,'error':None}
    except: pass
    return demo

def get_forecast(city):
    demo = [{'day':d,'temp_max':t,'temp_min':t-5,'description':desc,'icon':ic,'humidity':65+i*3}
            for i,(d,t,desc,ic) in enumerate(zip(
                ['Tomorrow','Day 3','Day 4','Day 5','Day 6'],
                [30,28,25,27,31],
                ['Sunny','Partly Cloudy','Light Rain','Cloudy','Clear'],
                ['01d','02d','10d','03d','01d']))]
    if not city or WEATHER_API_KEY == 'demo_key': return demo
    try:
        r = requests.get(f"{WEATHER_BASE_URL}/forecast?q={city}&appid={WEATHER_API_KEY}&units=metric", timeout=5)
        if r.status_code == 200:
            data = r.json(); forecast = []; seen = set()
            for item in data['list']:
                date = item['dt_txt'].split(' ')[0]
                if date not in seen and len(forecast) < 5:
                    seen.add(date)
                    dt = datetime.strptime(date,'%Y-%m-%d')
                    forecast.append({'day':dt.strftime('%a %d'),'temp_max':round(item['main']['temp_max'],1),
                        'temp_min':round(item['main']['temp_min'],1),'description':item['weather'][0]['description'].title(),
                        'icon':item['weather'][0]['icon'],'humidity':item['main']['humidity']})
            return forecast
    except: pass
    return demo

# ── Template Globals ───────────────────────────────────────────
@app.template_global()
def now(): return datetime.now()

@app.template_global()
def crop_emoji(name): return CROP_INFO.get(name,{}).get('emoji','🌿')

@app.template_filter('unique')
def unique_filter(it): return list(set(it))

# ═══════════════════════════════════════════════════════════════
#  ROUTES — Auth
# ═══════════════════════════════════════════════════════════════
@app.route('/')
def index():
    return redirect(url_for('dashboard') if 'farmer_id' in session else url_for('login'))

@app.route('/register', methods=['GET','POST'])
def register():
    if request.method == 'POST':
        name     = request.form.get('name','').strip()
        email    = request.form.get('email','').strip().lower()
        password = request.form.get('password','')
        phone    = request.form.get('phone','').strip()
        location = request.form.get('location','').strip()
        land     = request.form.get('land_area', 0)
        if not all([name, email, password]):
            flash('Please fill all required fields.', 'danger')
            return render_template('register.html')
        if len(password) < 6:
            flash('Password must be at least 6 characters.', 'danger')
            return render_template('register.html')
        try:
            conn = get_db()
            conn.execute('INSERT INTO farmers (name,email,password,phone,location,land_area) VALUES (?,?,?,?,?,?)',
                (name, email, generate_password_hash(password), phone, location, float(land) if land else 0))
            conn.commit(); conn.close()
            flash('Registration successful! Please login. 🌱', 'success')
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Email already registered. Please login.', 'warning')
        except Exception as e:
            flash(f'Error: {str(e)}', 'danger')
    return render_template('register.html')

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        email    = request.form.get('email','').strip().lower()
        password = request.form.get('password','')
        conn     = get_db()
        farmer   = conn.execute('SELECT * FROM farmers WHERE email=?',(email,)).fetchone()
        conn.close()
        if farmer and check_password_hash(farmer['password'], password):
            session['farmer_id']       = farmer['id']
            session['farmer_name']     = farmer['name']
            session['farmer_location'] = farmer['location'] or ''
            flash(f'Welcome back, {farmer["name"]}! 🌱', 'success')
            return redirect(url_for('dashboard'))
        flash('Invalid email or password.', 'danger')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out successfully.', 'info')
    return redirect(url_for('login'))

# ── Forgot / Reset Password ────────────────────────────────────
@app.route('/forgot-password', methods=['GET','POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form.get('email','').strip().lower()
        if not email:
            flash('Please enter your email address.', 'danger')
            return render_template('forgot_password.html')
        conn   = get_db()
        farmer = conn.execute('SELECT * FROM farmers WHERE email=?',(email,)).fetchone()
        conn.close()
        if farmer:
            session['reset_email'] = email
            session['reset_name']  = farmer['name']
            flash(f'Email verified! Set your new password, {farmer["name"]}.', 'success')
            return redirect(url_for('reset_password'))
        flash('No account found with this email address.', 'danger')
    return render_template('forgot_password.html')

@app.route('/reset-password', methods=['GET','POST'])
def reset_password():
    if 'reset_email' not in session:
        flash('Please verify your email first.', 'warning')
        return redirect(url_for('forgot_password'))
    if request.method == 'POST':
        new_pwd  = request.form.get('new_password','')
        conf_pwd = request.form.get('confirm_password','')
        if len(new_pwd) < 6:
            flash('Password must be at least 6 characters.', 'danger')
            return render_template('reset_password.html', name=session.get('reset_name'))
        if new_pwd != conf_pwd:
            flash('Passwords do not match. Please try again.', 'danger')
            return render_template('reset_password.html', name=session.get('reset_name'))
        conn = get_db()
        conn.execute('UPDATE farmers SET password=? WHERE email=?',
                     (generate_password_hash(new_pwd), session['reset_email']))
        conn.commit(); conn.close()
        session.pop('reset_email', None); session.pop('reset_name', None)
        flash('Password reset successful! Please login with your new password. ✅', 'success')
        return redirect(url_for('login'))
    return render_template('reset_password.html', name=session.get('reset_name',''))

# ═══════════════════════════════════════════════════════════════
#  ROUTES — Farmer
# ═══════════════════════════════════════════════════════════════
@app.route('/dashboard')
@login_required
def dashboard():
    farmer_id = session['farmer_id']
    location  = request.args.get('city', session.get('farmer_location',''))
    weather   = get_weather(location)
    forecast  = get_forecast(location)
    conn      = get_db()
    preds     = conn.execute('SELECT * FROM predictions WHERE farmer_id=? ORDER BY predicted_at DESC LIMIT 5',(farmer_id,)).fetchall()
    total     = conn.execute('SELECT COUNT(*) as c FROM predictions WHERE farmer_id=?',(farmer_id,)).fetchone()['c']
    conn.close()
    month = datetime.now().month
    if   6 <= month <= 9:  tip='🌧️ Kharif Season — Rice, Maize, Cotton, Soybean, Groundnut'; season='Kharif'
    elif 10 <= month <= 3: tip='❄️ Rabi Season — Wheat, Mustard, Chickpea, Lentil, Peas';   season='Rabi'
    else:                  tip='☀️ Zaid Season — Watermelon, Muskmelon, Cucumber, Vegetables';season='Zaid'
    return render_template('dashboard.html', farmer_name=session['farmer_name'],
        weather=weather, forecast=forecast, predictions=preds,
        total_predictions=total, season_tip=tip, season=season, CROP_INFO=CROP_INFO)

@app.route('/predict', methods=['GET','POST'])
@login_required
def predict():
    if request.method == 'POST':
        try:
            N  = float(request.form['nitrogen'])
            P  = float(request.form['phosphorus'])
            K  = float(request.form['potassium'])
            ph = float(request.form['ph'])
            rf = float(request.form['rainfall'])
            city = request.form.get('location','').strip()
            errors = []
            if not (0   <= N  <= 140): errors.append('Nitrogen must be 0-140')
            if not (5   <= P  <= 145): errors.append('Phosphorus must be 5-145')
            if not (5   <= K  <= 205): errors.append('Potassium must be 5-205')
            if not (3.5 <= ph <= 9.5): errors.append('pH must be 3.5-9.5')
            if not (20  <= rf <= 300): errors.append('Rainfall must be 20-300')
            if errors:
                for e in errors: flash(e, 'warning')
                return render_template('prediction.html')
            weather = get_weather(city)
            temp    = weather['temperature']
            hum     = weather['humidity']
            if model_data:
                features = np.array([[N, P, K, temp, hum, ph, rf]])
                model    = model_data['model']
                le       = model_data['label_encoder']
                pred     = le.inverse_transform([model.predict(features)[0]])[0]
                proba    = model.predict_proba(features)[0]
                conf     = round(max(proba)*100, 1)
                top3     = [(le.inverse_transform([i])[0], round(proba[i]*100,1))
                            for i in np.argsort(proba)[::-1][:3]]
            else:
                pred = 'rice'; conf = 85.0; top3 = [('rice',85.0),('maize',10.0),('wheat',5.0)]
            info = CROP_INFO.get(pred, {'emoji':'🌿','season':'—','fertilizer':'Consult local agri office.','irrigation':'Follow standard practices.','market_price':'—','duration':'—'})
            conn = get_db()
            conn.execute('''INSERT INTO predictions
                (farmer_id,nitrogen,phosphorus,potassium,temperature,humidity,ph,rainfall,
                 predicted_crop,confidence,fertilizer_advice,irrigation_advice,location)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)''',
                (session['farmer_id'],N,P,K,temp,hum,ph,rf,pred,conf,
                 info['fertilizer'],info['irrigation'],city))
            conn.commit(); conn.close()
            return render_template('result.html', predicted_crop=pred, confidence=conf,
                top3_crops=top3, crop_details=info,
                inputs={'nitrogen':N,'phosphorus':P,'potassium':K,'ph':ph,'rainfall':rf,'temperature':temp,'humidity':hum},
                weather=weather, location=city)
        except ValueError:
            flash('Please enter valid numbers for all fields.', 'danger')
        except Exception as e:
            flash(f'Prediction error: {str(e)}', 'danger')
    return render_template('prediction.html')

@app.route('/history')
@login_required
def history():
    conn  = get_db()
    preds = conn.execute('SELECT * FROM predictions WHERE farmer_id=? ORDER BY predicted_at DESC',(session['farmer_id'],)).fetchall()
    conn.close()
    enriched = [{**dict(p), 'emoji': CROP_INFO.get(p['predicted_crop'],{}).get('emoji','🌿'),
                 'season': CROP_INFO.get(p['predicted_crop'],{}).get('season','—')} for p in preds]
    return render_template('history.html', predictions=enriched, farmer_name=session['farmer_name'])

# ── API Endpoints ──────────────────────────────────────────────
@app.route('/api/weather')
@login_required
def api_weather():
    return jsonify(get_weather(request.args.get('city','')))

@app.route('/api/forecast')
@login_required
def api_forecast():
    return jsonify(get_forecast(request.args.get('city','')))

# ═══════════════════════════════════════════════════════════════
#  ROUTES — Admin
# ═══════════════════════════════════════════════════════════════
@app.route('/admin/login', methods=['GET','POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username','').strip()
        password = request.form.get('password','')
        conn  = get_db()
        admin = conn.execute('SELECT * FROM admin WHERE username=?',(username,)).fetchone()
        conn.close()
        if admin and check_password_hash(admin['password'], password):
            session['admin_id']   = admin['id']
            session['admin_name'] = admin['username']
            return redirect(url_for('admin_dashboard'))
        flash('Invalid admin credentials.', 'danger')
    return render_template('admin_login.html')

@app.route('/admin/dashboard')
@admin_required
def admin_dashboard():
    conn        = get_db()
    total_f     = conn.execute('SELECT COUNT(*) as c FROM farmers').fetchone()['c']
    total_p     = conn.execute('SELECT COUNT(*) as c FROM predictions').fetchone()['c']
    all_preds   = conn.execute('''SELECT p.*,f.name as farmer_name FROM predictions p
                                  JOIN farmers f ON p.farmer_id=f.id
                                  ORDER BY p.predicted_at DESC LIMIT 100''').fetchall()
    all_farmers = conn.execute('''SELECT *,(SELECT COUNT(*) FROM predictions WHERE farmer_id=farmers.id) as pred_count
                                  FROM farmers ORDER BY created_at DESC''').fetchall()
    crop_dist   = conn.execute('SELECT predicted_crop,COUNT(*) as count FROM predictions GROUP BY predicted_crop ORDER BY count DESC').fetchall()
    conn.close()
    preds_rich  = [{**dict(p),'emoji':CROP_INFO.get(p['predicted_crop'],{}).get('emoji','🌿')} for p in all_preds]
    return render_template('admin.html', total_farmers=total_f, total_predictions=total_p,
        all_predictions=preds_rich, all_farmers=all_farmers, crop_dist=crop_dist)

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_id',None); session.pop('admin_name',None)
    return redirect(url_for('admin_login'))

# ── Main ───────────────────────────────────────────────────────
if __name__ == '__main__':
    init_db()
    print("\n" + "="*55)
    print("   🌱  SMART CROP ADVISORY SYSTEM — READY!")
    print("="*55)
    print(f"   🌐  Farmer App : http://127.0.0.1:5000")
    print(f"   🛡️   Admin Panel: http://127.0.0.1:5000/admin/login")
    print(f"   🔑  Admin Login: admin / admin123")
    print("="*55 + "\n")
    app.run(debug=True, port=5000)
