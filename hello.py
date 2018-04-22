from flask import Flask
from flask import request
from urllib.request import unquote #urllib
import scrapedemo as sd
import json

app = Flask(__name__)

@app.route("/get/url",methods = ["POST"])
def hello():
    print(request.json['url'])
    a = json.dumps(sd.pickwords(request.json['url']))
    print(a)
    return(a)