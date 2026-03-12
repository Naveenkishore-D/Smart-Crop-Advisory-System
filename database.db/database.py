import sqlite3

# connect to database (creates file if not exists)
conn = sqlite3.connect("database.db")

cursor = conn.cursor()

# create Farmers table
cursor.execute("""
CREATE TABLE IF NOT EXISTS Farmers(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
email TEXT UNIQUE,
password TEXT
)
""")

# create SoilData table
cursor.execute("""
CREATE TABLE IF NOT EXISTS SoilData(
id INTEGER PRIMARY KEY AUTOINCREMENT,
farmer_id INTEGER,
nitrogen REAL,
phosphorus REAL,
potassium REAL,
ph REAL,
rainfall REAL
)
""")

# create Predictions table
cursor.execute("""
CREATE TABLE IF NOT EXISTS Predictions(
id INTEGER PRIMARY KEY AUTOINCREMENT,
farmer_id INTEGER,
crop TEXT,
date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# create Admin table
cursor.execute("""
CREATE TABLE IF NOT EXISTS Admin(
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
password TEXT
)
""")

conn.commit()
conn.close()

print("Database created successfully")