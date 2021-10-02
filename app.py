from threading import main_thread
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Home Page"

if __name__ == "__main__":
    app.run(debug=True)