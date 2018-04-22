from flask import Flask
from flask import request
from urllib import unquote
import scrapedemo as sd
import json

app = Flask(__name__)

@app.route("/get/url",methods = ["POST"])
def hello():
     return json.dumps(sd.pickwords(request.json['url']))
     