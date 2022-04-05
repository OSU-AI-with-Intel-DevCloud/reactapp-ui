from email.quoprimime import unquote
from urllib import response
from flask import Flask

# setup ssh with https://devcloud.intel.com/oneapi/documentation/connect-with-ssh-linux-macos/

import subprocess
import time
import urllib.parse
import json
import pathlib

api = Flask(__name__)

@api.route('/results/<string:path>')
def get_results(path: str):
    #path = './example.txt'
    file_path = pathlib.PureWindowsPath(urllib.parse.unquote(path))
    # this switches slash direction for windows, for mac use p.as_posix()
    p = subprocess.Popen(f"scp {file_path} devcloud:deepfake/input/combined", shell=True, stdin=subprocess.PIPE,  stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(10)
    p2 = subprocess.Popen("scp devcloud:deepfake/output/submission-eff.csv output.txt", shell=True, stdin=subprocess.PIPE,  stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(3)
    with open('output.txt') as f:
        lines = f.readlines()
    f.close()
    response_body = "\n".join(lines)
    print(lines)
    r = {"body": response_body}
    return json.dumps(r)
    
import tkinter as tk
from tkinter import filedialog

@api.route('/path')
def get_path():
    root = tk.Tk()
    root.attributes('-topmost',True)
    root.iconify()
    file_path = filedialog.askopenfilename()
    root.destroy()

    print(file_path)

    return json.dumps(file_path)