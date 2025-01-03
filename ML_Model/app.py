import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot import generate_response  

app = Flask(__name__)
CORS(app)

@app.route("/home")
def home():
    return render_template("homepage.html")  

@app.route("/chatbot")
def chatbot():
    return render_template("chatbot.html") 

@app.route("/about")
def about():
    return render_template("about.html") 

@app.route("/contact")
def contact():
    return render_template("contact.html") 
@app.route("/blog")
def blog():
    print("Blog route hit!")
    return render_template("blog.html")  

@app.route("/predict", methods=["POST"])
def predict():
    text = request.get_json().get("message")
    if not text:
        return jsonify({"answer": "Please enter a message."})
    response = generate_response(text) 
    return jsonify({"answer": response})

if __name__ == "__main__":
    print("Starting Flask server...")
    app.run(debug=True, host="127.0.0.1", port=5000) 
