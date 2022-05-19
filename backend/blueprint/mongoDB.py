from flask import Blueprint, request, Response
# from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError

import json

client =  MongoClient(
                username='admin', password='admin',
                serverSelectionTimeoutMS = 3000) #'mongodb://mongodb_container',
db = client.appDB

database = Blueprint("database", __name__) # Option adding url_prefix="/"
#CORS(database)
@database.route('/data') # , methods=['GET', 'POST']
def get_all():
    # if (request.method == "GET"):
    payload = []
    try:
        for dta in db.test.find({}, {'_id':False}):
            payload.append(json.loads(json.dumps(dta)))
    except:
        payload = []
    return (payload, 200)

def upload_Many(lst):
    db.test.delete_many({"filename":lst[0]['filename']})

    for test in lst:
        db.test.update_many({"$and":[
        {"filename":test['filename']},
        {'algo':test['algo']}]},
        {"$set":test}, upsert=True)
