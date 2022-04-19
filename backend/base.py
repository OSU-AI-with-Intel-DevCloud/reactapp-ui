from email.quoprimime import unquote
from urllib import response
from flask import Flask

# setup ssh with https://devcloud.intel.com/oneapi/documentation/connect-with-ssh-linux-macos/

import subprocess
import time
import urllib.parse
import json
import pathlib
import csv

api = Flask(__name__)

@api.route('/results/<string:path>')
def get_results(path: str):
    #path = './example.txt'
    file_path = pathlib.PureWindowsPath(urllib.parse.unquote(path))
    # this switches slash direction for windows, for mac use p.as_posix()
    p = subprocess.Popen(f"scp {file_path} devcloud:deepfake/input/combined", shell=True, stdin=subprocess.PIPE,  stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(10)
    p2 = subprocess.Popen("scp devcloud:deepfake/output/submission.csv output.csv", shell=True, stdin=subprocess.PIPE,  stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(4)
    response_1 = ""
    response_2 = ""
    response_3 = ""
    response_4 = ""
    with open('output.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 1:
                response_1 += str(row[2]) + " results for " + str(row[0]) + " -- " + str(row[1]) + " -- Time elapsed: " + str(row[3]) + " seconds"
                temp_prob = float(row[1])
                if temp_prob < 0.3:
                    response_2 += "This low probability indicates a high likelihood that this is a real image"
                elif temp_prob > 0.3 and temp_prob < 0.7:
                    response_2 += "This midrange probability indicates that the deepfake detector had issues indicating whether or not this is a real image"
                elif temp_prob > 0.7:
                    response_2 += "This high probability indicates a high likelihood that this image is a deepfake"
            
            if line_count == 2:
                response_3 += str(row[2]) + " results for " + str(row[0]) + " -- " + str(row[1]) + " -- Time elapsed: " + str(row[3]) + " seconds"
                temp_prob = float(row[1])
                if temp_prob < 0.3:
                    response_4 += "This low probability indicates a high likelihood that this is a real image"
                elif temp_prob > 0.3 and temp_prob < 0.7:
                    response_4 += "This midrange probability indicates that the deepfake detector had issues indicating whether or not this is a real image"
                elif temp_prob > 0.7:
                    response_4 += "This high probability indicates a high likelihood that this image is a deepfake"
            line_count += 1
    csv_file.close()
    r = {"b1": response_1, "b2": response_2, "b3": response_3, "b4": response_4}
    #save results in text file here
    return json.dumps(r)
    
import tkinter as tk
from tkinter import filedialog
#import vlc

@api.route('/path')
def get_path():
    root = tk.Tk()
    root.attributes('-topmost',True)
    root.iconify()
    file_path = filedialog.askopenfilename()
    root.destroy()

    print(file_path)
    #media = vlc.MediaPlayer(file_path)
    #send image file over

    return json.dumps(file_path)