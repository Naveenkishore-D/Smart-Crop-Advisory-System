import requests

API_KEY="YOUR_OPENWEATHER_API_KEY"

def get_weather(city):

    url=f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    data=requests.get(url).json()

    weather={
        "temperature":data["main"]["temp"],
        "humidity":data["main"]["humidity"],
        "wind":data["wind"]["speed"]
    }

    return weather