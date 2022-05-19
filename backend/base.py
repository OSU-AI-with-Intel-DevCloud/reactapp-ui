from email.quoprimime import unquote
from genericpath import exists
from urllib import response
from flask import Flask, Response
#from flask_cors import CORS, cross_origin
from blueprint.mongoDB import database, get_all, upload_Many

# setup ssh with https://devcloud.intel.com/oneapi/documentation/connect-with-ssh-linux-macos/

import subprocess
import time
import urllib.parse
import json
import pathlib
import csv

api = Flask(__name__)
#api.config['CORS_HEADERS'] = 'Content-Type'
#CORS(api) #, origins = ["http://localhost:5000"]


@api.route('/results/<string:path>')#@cross_origin(origin='localhost',headers=['Content-Type'])#,'Authorization'
def get_results(path: str):
    #path = '/downloads/vid2.mp4'
    file_path = pathlib.PureWindowsPath(urllib.parse.unquote(path))
    video_name = str(file_path).split("\\")[-1]

    # this switches slash direction for windows, for mac use p.as_posix()
    p = subprocess.Popen(f"scp {file_path} devcloud:deepfake/cloud-scripts/input/combined", shell=True, stdin=subprocess.PIPE,  stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(10)
    p2 = subprocess.Popen("scp devcloud:deepfake/cloud-scripts/output/submission.csv output.csv", shell=True, stdin=subprocess.PIPE,  stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    time.sleep(4)

    new_Dict = []
    with open('output.csv') as csv_file:
        fieldnames = ("filename","label","algo","time")
        reader = csv.DictReader(csv_file, fieldnames)
        counter = -1
        for row in reader:
            if counter >= 0:
                new_Dict.append(row)
                new_Dict[counter]["filename"] = video_name
            counter += 1

    csv_file.close()

    upload_Many(json.loads(json.dumps(new_Dict)))

    allTests = get_all()
    dct = {}
    lst = allTests[0][-6:]
    print(lst)
    for test in lst:
        if test['filename'] not in dct:
            dct[test['filename']] = ["",""]
        if test['algo'] == "ResNeXt50 Classifier":
            dct[test['filename']][1] = test
        else:
            dct[test['filename']][0] = test

    #save results in text file here
    return Response(response = json.dumps(dct), status = 200)#, headers = {'Access-Control-Allow-Origin':'http://localhost:3000'}

import tkinter as tk
from tkinter import filedialog
import cv2

@api.route('/path')#, methods=['GET']#@cross_origin(origin='localhost',headers=['Content-Type']) #,'Authorization'
def get_path():
    root = tk.Tk()
    root.attributes('-topmost',True)
    root.iconify()
    file_path = filedialog.askopenfilename()
    root.destroy()
    #
    #send image file over
    if (exists(file_path)):
        vidcap = cv2.VideoCapture(file_path)
        success, image = vidcap.read()
        if success:
            cv2.imwrite("../frontend/src/components/first_frame.jpg", image)  # save frame as JPEG file

    return Response(response = json.dumps(file_path), status = 200) #, headers = {'Access-Control-Allow-Origin':'http://localhost:3000'}


# call /data
api.register_blueprint(database)
