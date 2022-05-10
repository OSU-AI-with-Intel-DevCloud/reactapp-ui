from email.quoprimime import unquote
from genericpath import exists
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
    time.sleep(12)
    p2 = subprocess.Popen("scp devcloud:deepfake/output/submission.csv output.csv", shell=True, stdin=subprocess.PIPE,  stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(4)
    responses = [""] * 12
    with open('output.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count == 1:
                responses[0] += str(row[2]) + " results for " + str(row[0]) + " -- " + str(row[1]) + " -- Time elapsed: " + str(row[3]) + " seconds"
                temp_prob = float(row[1])
                if temp_prob < 0.3:
                    responses[1] += "This low probability indicates a high likelihood that this is a real image"
                elif temp_prob > 0.3 and temp_prob < 0.7:
                    responses[1] += "This midrange probability indicates that the deepfake detector had issues indicating whether or not this is a real image"
                elif temp_prob > 0.7:
                    responses[1] += "This high probability indicates a high likelihood that this image is a deepfake"
            
            if line_count == 2:
                responses[2] += str(row[2]) + " results for " + str(row[0]) + " -- " + str(row[1]) + " -- Time elapsed: " + str(row[3]) + " seconds"
                temp_prob = float(row[1])
                if temp_prob < 0.3:
                    responses[3] += "This low probability indicates a high likelihood that this is a real image"
                elif temp_prob > 0.3 and temp_prob < 0.7:
                    responses[3] += "This midrange probability indicates that the deepfake detector had issues indicating whether or not this is a real image"
                elif temp_prob > 0.7:
                    responses[3] += "This high probability indicates a high likelihood that this image is a deepfake"
            line_count += 1
    csv_file.close()

    temp = []
    with open('log.txt') as f:
        # https://stackoverflow.com/questions/20364396/how-to-delete-the-first-line-of-a-text-file
        content = f.readlines()
        log_len = len(content)
        if (log_len > 7):
            content = content[log_len-8:]
        responses[4] = content[4].rstrip()
        responses[5] = content[5].rstrip()
        responses[6] = content[6].rstrip()
        responses[7] = content[7].rstrip()
        responses[8] = content[0].rstrip()
        responses[9] = content[1].rstrip()
        responses[10] = content[2].rstrip()
        responses[11] = content[3].rstrip()
        for i in range(0,4):
            temp.append('\n' + responses[i])
    f = open('log.txt', 'a')
    f.writelines(temp)
    f.close
    for line in responses:
        print(line)

    r = {"b1": responses[0], "b2": responses[1], "b3": responses[2], "b4": responses[3], "b5": responses[4], "b6": responses[5], "b7": responses[6], "b8": responses[7], "b9": responses[8], "b10": responses[9], "b11": responses[10], "b12": responses[11]}
    
    #save results in text file here
    return json.dumps(r)
    
import tkinter as tk
from tkinter import filedialog
import cv2

@api.route('/path')
def get_path():
    root = tk.Tk()
    root.attributes('-topmost',True)
    root.iconify()
    file_path = filedialog.askopenfilename()
    root.destroy()

    #send image file over
    if (exists(file_path)):
        vidcap = cv2.VideoCapture(file_path)
        success, image = vidcap.read()
        if success:
            cv2.imwrite("../src/components/first_frame.jpg", image)  # save frame as JPEG file

    return json.dumps(file_path)
