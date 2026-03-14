/**
 * =============================================================
 *  script.js — Smart Crop Advisory System
 *  Complete Frontend JavaScript
 *  Features:
 *   01. India Cities Database (600+ cities)
 *   02. Weather Icon Map
 *   03. DOM Ready Init
 *   04. Slider ↔ Number Input Sync
 *   05. Animated Stat Counters
 *   06. Animated Progress Bars
 *   07. Auto-Dismiss Flash Alerts
 *   08. Active Nav Link Highlight
 *   09. Weather AJAX Refresh
 *   10. 5-Day Forecast Update
 *   11. Prediction Form Submit Loader
 *   12. Live Soil Health Indicator
 *   13. City Autocomplete (Predict Page)
 *   14. Dashboard City Search
 *   15. Password Strength Meter
 *   16. Password Show/Hide Toggle
 *   17. Confirm Password Match Checker
 *   18. Scroll-to-Top Button
 *   19. Page Entrance Animation
 *   20. Admin Sidebar Toggle (Mobile)
 *   21. Toast Notifications
 *   22. Copy to Clipboard
 *   23. Print Result Page
 *   24. Utility Helpers
 * =============================================================
 */

'use strict';

/* ============================================================
   01. INDIA CITIES DATABASE (600+ cities across all states/UTs)
   ============================================================ */
const INDIA_CITIES = [
  // Tamil Nadu
  {n:'Chennai',s:'Tamil Nadu'},{n:'Coimbatore',s:'Tamil Nadu'},{n:'Madurai',s:'Tamil Nadu'},
  {n:'Tiruchirappalli',s:'Tamil Nadu'},{n:'Salem',s:'Tamil Nadu'},{n:'Tirunelveli',s:'Tamil Nadu'},
  {n:'Tiruppur',s:'Tamil Nadu'},{n:'Erode',s:'Tamil Nadu'},{n:'Vellore',s:'Tamil Nadu'},
  {n:'Thoothukkudi',s:'Tamil Nadu'},{n:'Dindigul',s:'Tamil Nadu'},{n:'Thanjavur',s:'Tamil Nadu'},
  {n:'Ranipet',s:'Tamil Nadu'},{n:'Sivakasi',s:'Tamil Nadu'},{n:'Karur',s:'Tamil Nadu'},
  {n:'Udhagamandalam',s:'Tamil Nadu'},{n:'Hosur',s:'Tamil Nadu'},{n:'Nagercoil',s:'Tamil Nadu'},
  {n:'Kanchipuram',s:'Tamil Nadu'},{n:'Cuddalore',s:'Tamil Nadu'},{n:'Kumbakonam',s:'Tamil Nadu'},
  {n:'Tiruvannamalai',s:'Tamil Nadu'},{n:'Pollachi',s:'Tamil Nadu'},{n:'Rajapalayam',s:'Tamil Nadu'},
  {n:'Pudukkottai',s:'Tamil Nadu'},{n:'Nagapattinam',s:'Tamil Nadu'},{n:'Viluppuram',s:'Tamil Nadu'},
  {n:'Tiruvallur',s:'Tamil Nadu'},{n:'Dharmapuri',s:'Tamil Nadu'},{n:'Krishnagiri',s:'Tamil Nadu'},
  {n:'Namakkal',s:'Tamil Nadu'},{n:'Ramanathapuram',s:'Tamil Nadu'},{n:'Sivaganga',s:'Tamil Nadu'},
  {n:'Virudhunagar',s:'Tamil Nadu'},{n:'Tenkasi',s:'Tamil Nadu'},{n:'Chengalpattu',s:'Tamil Nadu'},
  {n:'Ariyalur',s:'Tamil Nadu'},{n:'Perambalur',s:'Tamil Nadu'},{n:'Tiruvarur',s:'Tamil Nadu'},
  {n:'Ambur',s:'Tamil Nadu'},{n:'Vaniyambadi',s:'Tamil Nadu'},{n:'Karaikkudi',s:'Tamil Nadu'},
  {n:'Neyveli',s:'Tamil Nadu'},{n:'Gudiyatham',s:'Tamil Nadu'},{n:'Kumarapalayam',s:'Tamil Nadu'},

  // Maharashtra
  {n:'Mumbai',s:'Maharashtra'},{n:'Pune',s:'Maharashtra'},{n:'Nagpur',s:'Maharashtra'},
  {n:'Thane',s:'Maharashtra'},{n:'Nashik',s:'Maharashtra'},{n:'Aurangabad',s:'Maharashtra'},
  {n:'Solapur',s:'Maharashtra'},{n:'Kolhapur',s:'Maharashtra'},{n:'Amravati',s:'Maharashtra'},
  {n:'Nanded',s:'Maharashtra'},{n:'Sangli',s:'Maharashtra'},{n:'Malegaon',s:'Maharashtra'},
  {n:'Jalgaon',s:'Maharashtra'},{n:'Akola',s:'Maharashtra'},{n:'Latur',s:'Maharashtra'},
  {n:'Dhule',s:'Maharashtra'},{n:'Ahmednagar',s:'Maharashtra'},{n:'Chandrapur',s:'Maharashtra'},
  {n:'Parbhani',s:'Maharashtra'},{n:'Ichalkaranji',s:'Maharashtra'},{n:'Jalna',s:'Maharashtra'},
  {n:'Bhiwandi',s:'Maharashtra'},{n:'Panvel',s:'Maharashtra'},{n:'Navi Mumbai',s:'Maharashtra'},
  {n:'Vasai',s:'Maharashtra'},{n:'Satara',s:'Maharashtra'},{n:'Ratnagiri',s:'Maharashtra'},
  {n:'Osmanabad',s:'Maharashtra'},{n:'Beed',s:'Maharashtra'},{n:'Ambernath',s:'Maharashtra'},

  // Uttar Pradesh
  {n:'Lucknow',s:'Uttar Pradesh'},{n:'Kanpur',s:'Uttar Pradesh'},{n:'Agra',s:'Uttar Pradesh'},
  {n:'Varanasi',s:'Uttar Pradesh'},{n:'Meerut',s:'Uttar Pradesh'},{n:'Prayagraj',s:'Uttar Pradesh'},
  {n:'Allahabad',s:'Uttar Pradesh'},{n:'Bareilly',s:'Uttar Pradesh'},{n:'Aligarh',s:'Uttar Pradesh'},
  {n:'Moradabad',s:'Uttar Pradesh'},{n:'Saharanpur',s:'Uttar Pradesh'},{n:'Gorakhpur',s:'Uttar Pradesh'},
  {n:'Noida',s:'Uttar Pradesh'},{n:'Firozabad',s:'Uttar Pradesh'},{n:'Jhansi',s:'Uttar Pradesh'},
  {n:'Muzaffarnagar',s:'Uttar Pradesh'},{n:'Mathura',s:'Uttar Pradesh'},{n:'Rampur',s:'Uttar Pradesh'},
  {n:'Shahjahanpur',s:'Uttar Pradesh'},{n:'Farrukhabad',s:'Uttar Pradesh'},{n:'Hapur',s:'Uttar Pradesh'},
  {n:'Etawah',s:'Uttar Pradesh'},{n:'Mirzapur',s:'Uttar Pradesh'},{n:'Bulandshahr',s:'Uttar Pradesh'},
  {n:'Ghaziabad',s:'Uttar Pradesh'},{n:'Sitapur',s:'Uttar Pradesh'},{n:'Loni',s:'Uttar Pradesh'},
  {n:'Sambhal',s:'Uttar Pradesh'},{n:'Amroha',s:'Uttar Pradesh'},{n:'Mau',s:'Uttar Pradesh'},

  // Karnataka
  {n:'Bengaluru',s:'Karnataka'},{n:'Hubli',s:'Karnataka'},{n:'Mysuru',s:'Karnataka'},
  {n:'Mangaluru',s:'Karnataka'},{n:'Belagavi',s:'Karnataka'},{n:'Davangere',s:'Karnataka'},
  {n:'Ballari',s:'Karnataka'},{n:'Vijayapura',s:'Karnataka'},{n:'Shimoga',s:'Karnataka'},
  {n:'Tumkur',s:'Karnataka'},{n:'Raichur',s:'Karnataka'},{n:'Bidar',s:'Karnataka'},
  {n:'Gulbarga',s:'Karnataka'},{n:'Hassan',s:'Karnataka'},{n:'Dharwad',s:'Karnataka'},
  {n:'Udupi',s:'Karnataka'},{n:'Kolar',s:'Karnataka'},{n:'Mandya',s:'Karnataka'},
  {n:'Chikmagalur',s:'Karnataka'},{n:'Chitradurga',s:'Karnataka'},{n:'Bagalkot',s:'Karnataka'},
  {n:'Gadag',s:'Karnataka'},{n:'Koppal',s:'Karnataka'},{n:'Yadgir',s:'Karnataka'},

  // Andhra Pradesh
  {n:'Visakhapatnam',s:'Andhra Pradesh'},{n:'Vijayawada',s:'Andhra Pradesh'},{n:'Guntur',s:'Andhra Pradesh'},
  {n:'Nellore',s:'Andhra Pradesh'},{n:'Kurnool',s:'Andhra Pradesh'},{n:'Rajahmundry',s:'Andhra Pradesh'},
  {n:'Kakinada',s:'Andhra Pradesh'},{n:'Tirupati',s:'Andhra Pradesh'},{n:'Anantapur',s:'Andhra Pradesh'},
  {n:'Kadapa',s:'Andhra Pradesh'},{n:'Vizianagaram',s:'Andhra Pradesh'},{n:'Eluru',s:'Andhra Pradesh'},
  {n:'Ongole',s:'Andhra Pradesh'},{n:'Nandyal',s:'Andhra Pradesh'},{n:'Machilipatnam',s:'Andhra Pradesh'},
  {n:'Adoni',s:'Andhra Pradesh'},{n:'Tenali',s:'Andhra Pradesh'},{n:'Proddatur',s:'Andhra Pradesh'},
  {n:'Chittoor',s:'Andhra Pradesh'},{n:'Hindupur',s:'Andhra Pradesh'},

  // Telangana
  {n:'Hyderabad',s:'Telangana'},{n:'Warangal',s:'Telangana'},{n:'Nizamabad',s:'Telangana'},
  {n:'Karimnagar',s:'Telangana'},{n:'Khammam',s:'Telangana'},{n:'Ramagundam',s:'Telangana'},
  {n:'Secunderabad',s:'Telangana'},{n:'Mahbubnagar',s:'Telangana'},{n:'Nalgonda',s:'Telangana'},
  {n:'Adilabad',s:'Telangana'},{n:'Suryapet',s:'Telangana'},{n:'Miryalaguda',s:'Telangana'},

  // West Bengal
  {n:'Kolkata',s:'West Bengal'},{n:'Asansol',s:'West Bengal'},{n:'Siliguri',s:'West Bengal'},
  {n:'Durgapur',s:'West Bengal'},{n:'Bardhaman',s:'West Bengal'},{n:'Malda',s:'West Bengal'},
  {n:'Baharampur',s:'West Bengal'},{n:'Habra',s:'West Bengal'},{n:'Kharagpur',s:'West Bengal'},
  {n:'Shantipur',s:'West Bengal'},{n:'Ranaghat',s:'West Bengal'},{n:'Haldia',s:'West Bengal'},
  {n:'Raiganj',s:'West Bengal'},{n:'Darjeeling',s:'West Bengal'},{n:'Jalpaiguri',s:'West Bengal'},
  {n:'Dankuni',s:'West Bengal'},{n:'Dhulian',s:'West Bengal'},

  // Rajasthan
  {n:'Jaipur',s:'Rajasthan'},{n:'Jodhpur',s:'Rajasthan'},{n:'Kota',s:'Rajasthan'},
  {n:'Bikaner',s:'Rajasthan'},{n:'Ajmer',s:'Rajasthan'},{n:'Udaipur',s:'Rajasthan'},
  {n:'Bhilwara',s:'Rajasthan'},{n:'Alwar',s:'Rajasthan'},{n:'Bharatpur',s:'Rajasthan'},
  {n:'Sikar',s:'Rajasthan'},{n:'Pali',s:'Rajasthan'},{n:'Sri Ganganagar',s:'Rajasthan'},
  {n:'Tonk',s:'Rajasthan'},{n:'Barmer',s:'Rajasthan'},{n:'Kishangarh',s:'Rajasthan'},
  {n:'Chittorgarh',s:'Rajasthan'},{n:'Nagaur',s:'Rajasthan'},{n:'Beawar',s:'Rajasthan'},

  // Madhya Pradesh
  {n:'Bhopal',s:'Madhya Pradesh'},{n:'Indore',s:'Madhya Pradesh'},{n:'Jabalpur',s:'Madhya Pradesh'},
  {n:'Gwalior',s:'Madhya Pradesh'},{n:'Ujjain',s:'Madhya Pradesh'},{n:'Sagar',s:'Madhya Pradesh'},
  {n:'Dewas',s:'Madhya Pradesh'},{n:'Satna',s:'Madhya Pradesh'},{n:'Ratlam',s:'Madhya Pradesh'},
  {n:'Rewa',s:'Madhya Pradesh'},{n:'Murwara',s:'Madhya Pradesh'},{n:'Singrauli',s:'Madhya Pradesh'},
  {n:'Burhanpur',s:'Madhya Pradesh'},{n:'Khandwa',s:'Madhya Pradesh'},{n:'Bhind',s:'Madhya Pradesh'},
  {n:'Chhindwara',s:'Madhya Pradesh'},{n:'Morena',s:'Madhya Pradesh'},{n:'Vidisha',s:'Madhya Pradesh'},

  // Gujarat
  {n:'Ahmedabad',s:'Gujarat'},{n:'Surat',s:'Gujarat'},{n:'Vadodara',s:'Gujarat'},
  {n:'Rajkot',s:'Gujarat'},{n:'Bhavnagar',s:'Gujarat'},{n:'Jamnagar',s:'Gujarat'},
  {n:'Junagadh',s:'Gujarat'},{n:'Gandhinagar',s:'Gujarat'},{n:'Anand',s:'Gujarat'},
  {n:'Bharuch',s:'Gujarat'},{n:'Navsari',s:'Gujarat'},{n:'Morbi',s:'Gujarat'},
  {n:'Nadiad',s:'Gujarat'},{n:'Surendranagar',s:'Gujarat'},{n:'Mehsana',s:'Gujarat'},
  {n:'Bhuj',s:'Gujarat'},{n:'Porbandar',s:'Gujarat'},{n:'Amreli',s:'Gujarat'},

  // Bihar
  {n:'Patna',s:'Bihar'},{n:'Gaya',s:'Bihar'},{n:'Bhagalpur',s:'Bihar'},
  {n:'Muzaffarpur',s:'Bihar'},{n:'Purnia',s:'Bihar'},{n:'Darbhanga',s:'Bihar'},
  {n:'Arrah',s:'Bihar'},{n:'Begusarai',s:'Bihar'},{n:'Katihar',s:'Bihar'},
  {n:'Munger',s:'Bihar'},{n:'Chapra',s:'Bihar'},{n:'Hajipur',s:'Bihar'},
  {n:'Bihar Sharif',s:'Bihar'},{n:'Sasaram',s:'Bihar'},{n:'Dehri',s:'Bihar'},

  // Punjab
  {n:'Ludhiana',s:'Punjab'},{n:'Amritsar',s:'Punjab'},{n:'Jalandhar',s:'Punjab'},
  {n:'Patiala',s:'Punjab'},{n:'Bathinda',s:'Punjab'},{n:'Hoshiarpur',s:'Punjab'},
  {n:'Mohali',s:'Punjab'},{n:'Batala',s:'Punjab'},{n:'Pathankot',s:'Punjab'},
  {n:'Moga',s:'Punjab'},{n:'Abohar',s:'Punjab'},{n:'Malerkotla',s:'Punjab'},
  {n:'Khanna',s:'Punjab'},{n:'Phagwara',s:'Punjab'},{n:'Muktsar',s:'Punjab'},

  // Haryana
  {n:'Faridabad',s:'Haryana'},{n:'Gurgaon',s:'Haryana'},{n:'Panipat',s:'Haryana'},
  {n:'Ambala',s:'Haryana'},{n:'Yamunanagar',s:'Haryana'},{n:'Rohtak',s:'Haryana'},
  {n:'Hisar',s:'Haryana'},{n:'Karnal',s:'Haryana'},{n:'Sonipat',s:'Haryana'},
  {n:'Panchkula',s:'Haryana'},{n:'Bhiwani',s:'Haryana'},{n:'Sirsa',s:'Haryana'},
  {n:'Bahadurgarh',s:'Haryana'},{n:'Jind',s:'Haryana'},{n:'Thanesar',s:'Haryana'},

  // Delhi
  {n:'New Delhi',s:'Delhi'},{n:'Delhi',s:'Delhi'},{n:'Dwarka',s:'Delhi'},
  {n:'Rohini',s:'Delhi'},{n:'Pitampura',s:'Delhi'},{n:'Saket',s:'Delhi'},

  // Odisha
  {n:'Bhubaneswar',s:'Odisha'},{n:'Cuttack',s:'Odisha'},{n:'Rourkela',s:'Odisha'},
  {n:'Brahmapur',s:'Odisha'},{n:'Sambalpur',s:'Odisha'},{n:'Puri',s:'Odisha'},
  {n:'Balasore',s:'Odisha'},{n:'Bhadrak',s:'Odisha'},{n:'Baripada',s:'Odisha'},
  {n:'Jharsuguda',s:'Odisha'},{n:'Jeypore',s:'Odisha'},{n:'Bargarh',s:'Odisha'},

  // Kerala
  {n:'Thiruvananthapuram',s:'Kerala'},{n:'Kochi',s:'Kerala'},{n:'Kozhikode',s:'Kerala'},
  {n:'Kollam',s:'Kerala'},{n:'Thrissur',s:'Kerala'},{n:'Alappuzha',s:'Kerala'},
  {n:'Palakkad',s:'Kerala'},{n:'Kannur',s:'Kerala'},{n:'Kottayam',s:'Kerala'},
  {n:'Malappuram',s:'Kerala'},{n:'Kasaragod',s:'Kerala'},{n:'Pathanamthitta',s:'Kerala'},
  {n:'Idukki',s:'Kerala'},{n:'Wayanad',s:'Kerala'},

  // Jharkhand
  {n:'Ranchi',s:'Jharkhand'},{n:'Jamshedpur',s:'Jharkhand'},{n:'Dhanbad',s:'Jharkhand'},
  {n:'Bokaro',s:'Jharkhand'},{n:'Deoghar',s:'Jharkhand'},{n:'Hazaribagh',s:'Jharkhand'},
  {n:'Giridih',s:'Jharkhand'},{n:'Ramgarh',s:'Jharkhand'},{n:'Medininagar',s:'Jharkhand'},

  // Assam
  {n:'Guwahati',s:'Assam'},{n:'Silchar',s:'Assam'},{n:'Dibrugarh',s:'Assam'},
  {n:'Jorhat',s:'Assam'},{n:'Nagaon',s:'Assam'},{n:'Tinsukia',s:'Assam'},
  {n:'Tezpur',s:'Assam'},{n:'Bongaigaon',s:'Assam'},{n:'Dhubri',s:'Assam'},

  // Himachal Pradesh
  {n:'Shimla',s:'Himachal Pradesh'},{n:'Solan',s:'Himachal Pradesh'},
  {n:'Dharamsala',s:'Himachal Pradesh'},{n:'Mandi',s:'Himachal Pradesh'},
  {n:'Kullu',s:'Himachal Pradesh'},{n:'Manali',s:'Himachal Pradesh'},
  {n:'Bilaspur',s:'Himachal Pradesh'},{n:'Hamirpur',s:'Himachal Pradesh'},

  // Uttarakhand
  {n:'Dehradun',s:'Uttarakhand'},{n:'Haridwar',s:'Uttarakhand'},{n:'Roorkee',s:'Uttarakhand'},
  {n:'Haldwani',s:'Uttarakhand'},{n:'Rudrapur',s:'Uttarakhand'},{n:'Kashipur',s:'Uttarakhand'},
  {n:'Rishikesh',s:'Uttarakhand'},{n:'Nainital',s:'Uttarakhand'},{n:'Mussoorie',s:'Uttarakhand'},

  // Chhattisgarh
  {n:'Raipur',s:'Chhattisgarh'},{n:'Bhilai',s:'Chhattisgarh'},{n:'Bilaspur',s:'Chhattisgarh'},
  {n:'Korba',s:'Chhattisgarh'},{n:'Durg',s:'Chhattisgarh'},{n:'Rajnandgaon',s:'Chhattisgarh'},
  {n:'Jagdalpur',s:'Chhattisgarh'},{n:'Ambikapur',s:'Chhattisgarh'},

  // Goa
  {n:'Panaji',s:'Goa'},{n:'Margao',s:'Goa'},{n:'Vasco da Gama',s:'Goa'},
  {n:'Mapusa',s:'Goa'},{n:'Ponda',s:'Goa'},

  // Union Territories & North-East
  {n:'Puducherry',s:'Puducherry'},{n:'Karaikal',s:'Puducherry'},
  {n:'Chandigarh',s:'Chandigarh'},
  {n:'Agartala',s:'Tripura'},{n:'Udaipur',s:'Tripura'},
  {n:'Aizawl',s:'Mizoram'},{n:'Lunglei',s:'Mizoram'},
  {n:'Imphal',s:'Manipur'},{n:'Thoubal',s:'Manipur'},
  {n:'Shillong',s:'Meghalaya'},{n:'Tura',s:'Meghalaya'},
  {n:'Kohima',s:'Nagaland'},{n:'Dimapur',s:'Nagaland'},
  {n:'Itanagar',s:'Arunachal Pradesh'},{n:'Naharlagun',s:'Arunachal Pradesh'},
  {n:'Gangtok',s:'Sikkim'},{n:'Namchi',s:'Sikkim'},
  {n:'Srinagar',s:'Jammu & Kashmir'},{n:'Jammu',s:'Jammu & Kashmir'},
  {n:'Anantnag',s:'Jammu & Kashmir'},{n:'Baramulla',s:'Jammu & Kashmir'},
  {n:'Leh',s:'Ladakh'},{n:'Kargil',s:'Ladakh'},
  {n:'Daman',s:'Daman & Diu'},{n:'Diu',s:'Daman & Diu'},
  {n:'Silvassa',s:'Dadra & Nagar Haveli'},
  {n:'Kavaratti',s:'Lakshadweep'},
  {n:'Port Blair',s:'Andaman & Nicobar'},
];

/* ============================================================
   02. WEATHER ICON MAP
   ============================================================ */
const FC_ICONS = {
  '01d':'☀️','01n':'🌙','02d':'⛅','02n':'⛅',
  '03d':'☁️','03n':'☁️','04d':'☁️','04n':'☁️',
  '09d':'🌧️','09n':'🌧️','10d':'🌦️','10n':'🌧️',
  '11d':'⛈️','11n':'⛈️','13d':'❄️','13n':'❄️',
  '50d':'🌫️','50n':'🌫️',
};

/* ============================================================
   03. DOM READY — Main Init
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initSliders();
  animateNumbers();
  animateBars();
  autoDismissAlerts();
  highlightActiveNav();
  initWeatherSearch();
  initPredictionForm();
  initScrollToTop();
  initPageAnimation();
  initCityAutocomplete('city_input', 'city_dropdown', 'city_list');
  initDashboardCitySearch();
  initPasswordFeatures();
});

/* ============================================================
   04. SLIDER <-> NUMBER INPUT SYNC
   ============================================================ */
function initSliders() {
  [['nitrogen','nitrogen_slider'],['phosphorus','phosphorus_slider'],
   ['potassium','potassium_slider'],['ph','ph_slider'],['rainfall','rainfall_slider']
  ].forEach(([inputId, sliderId]) => {
    const inp  = document.getElementById(inputId);
    const sldr = document.getElementById(sliderId);
    if (!inp || !sldr) return;
    inp.addEventListener('input',  () => { sldr.value = inp.value; updateSoilHealth(); });
    sldr.addEventListener('input', () => { inp.value  = sldr.value; updateSoilHealth(); });
  });
}

/* ============================================================
   05. ANIMATED STAT COUNTERS
   ============================================================ */
function animateNumbers() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target  = parseFloat(el.dataset.count);
    const isFloat = el.dataset.count.includes('.');
    const dur     = 1400;
    const t0      = performance.now();
    const tick = (now) => {
      const p   = Math.min((now - t0) / dur, 1);
      const e   = 1 - Math.pow(1 - p, 4);
      el.textContent = isFloat ? (target * e).toFixed(1) : Math.round(target * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ============================================================
   06. ANIMATED PROGRESS BARS
   ============================================================ */
function animateBars() {
  document.querySelectorAll('.prog-fill[data-width]').forEach((bar, i) => {
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.transition = 'width 0.9s cubic-bezier(0.4,0,0.2,1)';
      bar.style.width = parseFloat(bar.dataset.width) + '%';
    }, 150 + i * 80);
  });
}

/* ============================================================
   07. AUTO-DISMISS FLASH ALERTS
   ============================================================ */
function autoDismissAlerts() {
  document.querySelectorAll('.alert').forEach((alert, i) => {
    setTimeout(() => {
      alert.style.transition = 'opacity .5s ease, transform .5s ease';
      alert.style.opacity    = '0';
      alert.style.transform  = 'translateX(20px)';
      setTimeout(() => alert.remove(), 500);
    }, 4000 + i * 600);
  });
}

/* ============================================================
   08. HIGHLIGHT ACTIVE NAV LINK
   ============================================================ */
function highlightActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '/' && path.startsWith(href)) link.classList.add('active');
    else if (href === '/' && path === '/')             link.classList.add('active');
  });
}

/* ============================================================
   09. WEATHER AJAX REFRESH
   ============================================================ */
function initWeatherSearch() {
  const inp = document.getElementById('weather_city_input');
  const btn = document.getElementById('refresh_weather');
  if (!inp) return;
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); refreshWeather(inp.value.trim()); }
  });
}

function refreshWeather(city) {
  if (!city) return;
  const btn = document.getElementById('refresh_weather');
  if (btn) { btn.innerHTML = '⟳ Loading...'; btn.disabled = true; }

  // Current weather
  fetch('/api/weather?city=' + encodeURIComponent(city))
    .then(r => r.json())
    .then(d => {
      setEl('wc_city',     '📍 ' + d.city);
      setEl('wc_temp',     d.temperature + '°C');
      setEl('wc_desc',     d.description);
      setEl('wc_humidity', d.humidity + '%');
      setEl('wc_wind',     d.wind_speed + ' m/s');
      setEl('wc_feels',    'Feels ' + d.feels_like + '°C');
      const ico = document.getElementById('wc_icon');
      if (ico) ico.src = 'https://openweathermap.org/img/wn/' + d.icon + '@2x.png';
      showToast('✅ Weather updated for ' + d.city);
    })
    .catch(() => showToast('⚠️ Weather fetch failed', 'error'))
    .finally(() => {
      if (btn) { btn.innerHTML = '⟳ Refresh'; btn.disabled = false; }
    });

  // 5-day forecast
  fetch('/api/forecast?city=' + encodeURIComponent(city))
    .then(r => r.json())
    .then(updateForecastStrip)
    .catch(() => {});
}

/* ============================================================
   10. UPDATE 5-DAY FORECAST STRIP
   ============================================================ */
function updateForecastStrip(days) {
  const c = document.getElementById('forecast_strip');
  if (!c || !Array.isArray(days) || !days.length) return;
  c.innerHTML = days.map(d => `
    <div class="forecast-day fade-in-up">
      <div class="day-name">${d.day}</div>
      <div class="fc-icon">${FC_ICONS[d.icon] || '🌤️'}</div>
      <div class="fc-temp">${d.temp_max}°</div>
      <div class="fc-min">${d.temp_min}°</div>
    </div>`).join('');
}

/* ============================================================
   11. PREDICTION FORM — Submit Loader
   ============================================================ */
function initPredictionForm() {
  const form = document.getElementById('prediction_form');
  if (!form) return;
  form.addEventListener('submit', () => {
    const btn = form.querySelector('[type="submit"]');
    if (btn) { btn.innerHTML = '🔄 Analyzing soil data...'; btn.disabled = true; }
  });
  ['nitrogen','phosphorus','potassium','ph'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateSoilHealth);
  });
  updateSoilHealth();
}

/* ============================================================
   12. LIVE SOIL HEALTH INDICATOR
   ============================================================ */
function updateSoilHealth() {
  const ind = document.getElementById('soil_health_indicator');
  if (!ind) return;
  const n  = parseFloat(document.getElementById('nitrogen')?.value  || 0);
  const p  = parseFloat(document.getElementById('phosphorus')?.value || 0);
  const k  = parseFloat(document.getElementById('potassium')?.value  || 0);
  const ph = parseFloat(document.getElementById('ph')?.value         || 7);

  let score = 0;
  if (n  >= 20  && n  <= 100) score += 25;
  if (p  >= 20  && p  <= 80)  score += 25;
  if (k  >= 20  && k  <= 80)  score += 25;
  if (ph >= 5.5 && ph <= 7.5) score += 25;

  const levels = [
    {label:'⚠️ Poor',     color:'#ef4444'},
    {label:'🟡 Fair',     color:'#f59e0b'},
    {label:'🔵 Good',     color:'#3b82f6'},
    {label:'✅ Excellent',color:'#22c55e'},
  ];
  const lvl      = levels[Math.min(Math.floor(score / 26), 3)];
  ind.textContent = lvl.label;
  ind.style.color = lvl.color;
}

/* ============================================================
   13. CITY AUTOCOMPLETE — Predict Page
   ============================================================ */
let cityActiveIdx = -1;

function initCityAutocomplete(inputId, dropdownId, listId) {
  const inp = document.getElementById(inputId);
  const dd  = document.getElementById(dropdownId);
  if (!inp || !dd) return;

  inp.addEventListener('input',  () => { cityActiveIdx = -1; renderCityList(inp.value, dropdownId, listId, inputId); });
  inp.addEventListener('focus',  () => renderCityList(inp.value, dropdownId, listId, inputId));
  inp.addEventListener('blur',   () => setTimeout(() => hideCityDropdown(dropdownId), 200));
  inp.addEventListener('keydown', e => {
    const items = document.querySelectorAll('#' + listId + ' .city-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cityActiveIdx = Math.min(cityActiveIdx + 1, items.length - 1);
      updateActiveItem(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cityActiveIdx = Math.max(cityActiveIdx - 1, 0);
      updateActiveItem(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (cityActiveIdx >= 0 && items[cityActiveIdx]) {
        inp.value = items[cityActiveIdx].dataset.city;
        hideCityDropdown(dropdownId);
        cityActiveIdx = -1;
      }
    } else if (e.key === 'Escape') {
      hideCityDropdown(dropdownId);
    }
  });
}

function renderCityList(query, dropdownId, listId, inputId) {
  const dd   = document.getElementById(dropdownId);
  const list = document.getElementById(listId);
  if (!dd || !list) return;
  const q = query.trim().toLowerCase();

  let filtered = q.length === 0
    ? INDIA_CITIES.slice(0, 20)
    : INDIA_CITIES.filter(c =>
        c.n.toLowerCase().startsWith(q) ||
        c.n.toLowerCase().includes(q)   ||
        c.s.toLowerCase().includes(q)
      ).slice(0, 30);

  if (!filtered.length) { dd.style.display = 'none'; return; }

  list.innerHTML = filtered.map(c => `
    <div class="city-item" data-city="${c.n}"
         onmousedown="selectCity('${c.n}','${inputId}','${dropdownId}')">
      📍 ${boldMatch(c.n, q)}
      <span class="state-tag">${c.s}</span>
    </div>`).join('');
  dd.style.display = 'block';
}

function boldMatch(text, q) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q);
  if (i === -1) return text;
  return text.slice(0,i) +
    '<strong style="color:var(--green-dark)">' + text.slice(i, i + q.length) + '</strong>' +
    text.slice(i + q.length);
}

function selectCity(name, inputId, dropdownId) {
  const inp = document.getElementById(inputId);
  if (inp) inp.value = name;
  hideCityDropdown(dropdownId);
  cityActiveIdx = -1;
}

function hideCityDropdown(id) {
  const dd = document.getElementById(id || 'city_dropdown');
  if (dd) dd.style.display = 'none';
}

function updateActiveItem(items) {
  items.forEach((item, i) => {
    item.style.background = i === cityActiveIdx ? 'var(--green-ghost)' : '';
    item.style.fontWeight = i === cityActiveIdx ? '700' : '';
    if (i === cityActiveIdx) item.scrollIntoView({ block:'nearest' });
  });
}

// Inline HTML legacy aliases — used directly in HTML oninput/onfocus/onblur
function filterCities(val)  { renderCityList(val, 'city_dropdown', 'city_list', 'city_input'); }
function hideCityList()     { hideCityDropdown('city_dropdown'); }
function showAllCities()    { renderCityList('', 'city_dropdown', 'city_list', 'city_input'); }

/* ============================================================
   14. DASHBOARD CITY SEARCH (weather card)
   ============================================================ */
function initDashboardCitySearch() {
  const inp = document.getElementById('weather_city_input');
  const dd  = document.getElementById('dash_city_dropdown');
  if (!inp || !dd) return;
  inp.addEventListener('input',  () => dashFilterCities(inp.value));
  inp.addEventListener('focus',  () => dashFilterCities(inp.value));
  inp.addEventListener('blur',   () => setTimeout(dashHide, 200));
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter')  { e.preventDefault(); refreshWeather(inp.value.trim()); dashHide(); }
    if (e.key === 'Escape') dashHide();
  });
}

function dashFilterCities(val) {
  const dd   = document.getElementById('dash_city_dropdown');
  const list = document.getElementById('dash_city_list');
  if (!dd || !list) return;
  const q = val.trim().toLowerCase();
  let filtered = q.length === 0
    ? INDIA_CITIES.slice(0, 15)
    : INDIA_CITIES.filter(c =>
        c.n.toLowerCase().startsWith(q) ||
        c.n.toLowerCase().includes(q)   ||
        c.s.toLowerCase().includes(q)
      ).slice(0, 20);
  if (!filtered.length) { dd.style.display = 'none'; return; }
  list.innerHTML = filtered.map(c => `
    <div onmousedown="dashSelect('${c.n}')"
         style="padding:.55rem 1rem;font-size:.85rem;cursor:pointer;border-bottom:1px solid #f0f0f0;
                display:flex;align-items:center;justify-content:space-between;color:#1b1f2e"
         onmouseover="this.style.background='#d8f3dc'"
         onmouseout="this.style.background=''">
      📍 ${c.n}
      <span style="font-size:.72rem;color:#8a9ab0">${c.s}</span>
    </div>`).join('');
  dd.style.display = 'block';
}

function dashSelect(name) {
  const inp = document.getElementById('weather_city_input');
  if (inp) inp.value = name;
  dashHide();
  refreshWeather(name);
}

function dashHide() {
  const dd = document.getElementById('dash_city_dropdown');
  if (dd) dd.style.display = 'none';
}

/* ============================================================
   15 & 16 & 17. PASSWORD FEATURES (reset page)
   ============================================================ */
function initPasswordFeatures() {
  const p1 = document.getElementById('new_password');
  const p2 = document.getElementById('confirm_password');
  if (!p1) return;
  p1.addEventListener('input', () => { checkStrength(p1.value); if (p2 && p2.value) checkMatch(); });
  if (p2) p2.addEventListener('input', checkMatch);
}

// 16. Show/Hide Password Toggle
function togglePwd(fieldId, eyeId) {
  const inp = document.getElementById(fieldId);
  const eye = document.getElementById(eyeId);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  if (eye) eye.textContent = inp.type === 'password' ? '👁️' : '🙈';
}

// 15. Password Strength Meter
function checkStrength(val) {
  const bar   = document.getElementById('strength_bar');
  const label = document.getElementById('strength_label');
  if (!bar || !label) return;
  let score = 0;
  if (val.length >= 6)           score++;
  if (val.length >= 10)          score++;
  if (/[A-Z]/.test(val))         score++;
  if (/[0-9]/.test(val))         score++;
  if (/[^A-Za-z0-9]/.test(val))  score++;
  const levels = [
    {w:'20%', color:'#ef4444', text:'Very Weak'},
    {w:'40%', color:'#f97316', text:'Weak'},
    {w:'60%', color:'#eab308', text:'Fair'},
    {w:'80%', color:'#22c55e', text:'Strong'},
    {w:'100%',color:'#16a34a', text:'💪 Very Strong'},
  ];
  const lvl        = levels[Math.min(score, 4)];
  bar.style.width      = val.length === 0 ? '0%' : lvl.w;
  bar.style.background = lvl.color;
  bar.style.transition = 'width .4s ease, background .3s ease';
  label.textContent    = val.length === 0 ? '' : lvl.text;
  label.style.color    = lvl.color;
}

// 17. Confirm Password Match
function checkMatch() {
  const p1  = document.getElementById('new_password')?.value     || '';
  const p2  = document.getElementById('confirm_password')?.value || '';
  const msg = document.getElementById('match_msg');
  const btn = document.getElementById('submit_btn');
  if (!msg) return;
  if (!p2.length) { msg.textContent = ''; return; }
  if (p1 === p2) {
    msg.textContent = '✅ Passwords match!';
    msg.style.color = '#16a34a';
    if (btn) btn.disabled = false;
  } else {
    msg.textContent = '❌ Passwords do not match';
    msg.style.color = '#ef4444';
    if (btn) btn.disabled = true;
  }
}

/* ============================================================
   18. SCROLL-TO-TOP BUTTON
   ============================================================ */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.title     = 'Back to top';
  btn.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;width:42px;height:42px;
    background:var(--green-main,#2d6a4f);color:#fff;border:none;
    border-radius:50%;font-size:1.1rem;font-weight:700;cursor:pointer;
    opacity:0;pointer-events:none;transition:opacity .3s,transform .3s;
    box-shadow:0 4px 14px rgba(45,106,79,.4);z-index:8888;
    display:flex;align-items:center;justify-content:center;
  `;
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 300;
    btn.style.opacity       = show ? '1'    : '0';
    btn.style.pointerEvents = show ? 'auto' : 'none';
    btn.style.transform     = show ? 'translateY(0)' : 'translateY(8px)';
  });
}

/* ============================================================
   19. PAGE ENTRANCE ANIMATION (IntersectionObserver)
   ============================================================ */
function initPageAnimation() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card, .stat-card').forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(18px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    obs.observe(el);
  });
}

/* ============================================================
   20. ADMIN SIDEBAR TOGGLE (Mobile)
   ============================================================ */
function toggleAdminSidebar() {
  const sb = document.querySelector('.admin-sidebar');
  if (!sb) return;
  const open = sb.style.display !== 'block';
  Object.assign(sb.style, {
    display:  open ? 'block' : 'none',
    position: 'fixed', zIndex:'9000',
    top:'0', left:'0', height:'100vh', overflowY:'auto',
  });
}

/* ============================================================
   21. TOAST NOTIFICATIONS
   ============================================================ */
function showToast(message, type) {
  document.querySelectorAll('.toast-msg').forEach(t => t.remove());
  const bg = type === 'error'   ? '#dc2626'
           : type === 'warning' ? '#d97706'
           : type === 'info'    ? '#1e40af'
           :                      '#2d6a4f';
  const toast = document.createElement('div');
  toast.className  = 'toast-msg';
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed;bottom:5rem;right:1.5rem;background:${bg};color:#fff;
    padding:.75rem 1.25rem;border-radius:10px;font-size:.88rem;font-weight:600;
    box-shadow:0 8px 24px rgba(0,0,0,.18);z-index:9999;max-width:300px;
    opacity:0;transform:translateY(12px);
    transition:all .35s cubic-bezier(.4,0,.2,1);pointer-events:none;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateY(0)';
  }));
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(-8px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

/* ============================================================
   22. COPY TO CLIPBOARD
   ============================================================ */
function copyText(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.textContent || el.innerText || el.value || '';
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('📋 Copied to clipboard!'))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = Object.assign(document.createElement('textarea'), {
    value: text, style: 'position:fixed;opacity:0'
  });
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand('copy'); showToast('📋 Copied!'); }
  catch { showToast('⚠️ Copy failed', 'error'); }
  document.body.removeChild(ta);
}

/* ============================================================
   23. PRINT RESULT PAGE
   ============================================================ */
function printResult() { window.print(); }

/* ============================================================
   24. UTILITY HELPERS
   ============================================================ */

/** Safe set element text content */
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/** Format Indian number (e.g. 1,00,000) */
function formatNumber(n) {
  return Number(n).toLocaleString('en-IN');
}

/** Debounce wrapper */
function debounce(fn, delay) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
}

/** Check if element is visible in viewport */
function isInViewport(el) {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom >= 0;
}
