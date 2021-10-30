from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit, join_room
from flask_pymongo import PyMongo
from time import localtime, strftime
from passlib.hash import pbkdf2_sha256

current_user = "test"

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/ChatSquad"
mongodb_client = PyMongo(app)
db = mongodb_client.db

app.config["SECRET_KEY"] = "melodyitnichocolatykyuhai"
# Creating an instance of SocketIO using constructor.
socketio = SocketIO(app)


@app.route("/")
def home():
    return "home"


@app.route("/chat")
def chat():
    return render_template("chat.html", username=current_user)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # getting user's data from registration page
        users = db.users
        first_name = request.form["first-name"]
        last_name = request.form["last-name"]
        email = request.form["email"]
        dob = request.form["user-dob"]
        username = request.form["username"]
        password = request.form["password"]

        existing_user = users.find_one({"email": email, "username": username})
        if existing_user is None:
            # encrypting user's password for protection.
            hashed_password = pbkdf2_sha256.hash(password)

            # inserting data into the db.
            users.insert_one(
                {
                    "email": email,
                    "username": username,
                    "first_name": first_name,
                    "last_name": last_name,
                    "dob": dob,
                    "password": hashed_password,
                }
            )

    return render_template("register.html")


@socketio.on("message")
def message(data):
    # print("Message: ", data, "\n\n\n\n")
    send(
        {
            "msg": data["msg"],
            "username": data["username"],
            "timestamp": strftime("%b-%d %I:%M%p", localtime()),
        }
    )


@socketio.on("join")
def join(data):
    join_room(data["room"])
    send({"msg": data["username"] + "has joined the room"})


if __name__ == "__main__":
    socketio.run(app, debug=True)
