from email.quoprimime import unquote
from urllib import response
from flask import Flask

# setup ssh with https://devcloud.intel.com/oneapi/documentation/connect-with-ssh-linux-macos/

import subprocess
import time
import urllib.parse
import json

api = Flask(__name__)
#def get_results(filepath):
@api.route('/results/<string:path>')
def get_results(path: str):
    #path = './example.txt'
    file_path = urllib.parse.unquote(path)
    p = subprocess.Popen(f"scp {file_path} devcloud:deepfake/input/combined", shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(3)
    p2 = subprocess.Popen("scp devcloud:deepfake/input/combined/example.txt output.txt", shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(0.1)
    with open('output.txt') as f:
        lines = f.readlines()
    f.close()
    response_body = "\n".join(lines)
    r = {"body": response_body}
    return json.dumps(r)
