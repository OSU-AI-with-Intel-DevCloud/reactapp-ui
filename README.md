# User Interface Setup Instructions

Follow the instructions below in order to run our user interface locally on your machine.\
This interface runs locally using a React frontend with a Flask backend which is hooked up to MongoDB through Docker.\
The backend communicates with Intel DevCloud using scp (secure copy protocol) commands which require an ssh to be setup.

## Hardware Specification

The OS requirements here are gated by Docker. In order to run Docker either a Linux System or Windows 10 is required.\
In addition, 4 GB of RAM and 12 GB of disk space will be required.

## Front-end

### `git clone https://github.com/OSU-AI-with-Intel-DevCloud/reactapp-ui`
1. Start by cloning this repo onto your local machine.
2. Setup ssh with [https://devcloud.intel.com/oneapi/documentation/connect-with-ssh-linux-macos/](https://devcloud.intel.com/oneapi/documentation/connect-with-ssh-linux-macos/).
### `ssh devcloud`
This is necessary for the backend to work correctly and send files to Intel DevCloud.
An Intel DevCloud account is necessary for this step. Test that it is working with the above command.
### `npm i react`
3. Install React.
### `cd ./frontend`
### `npm install`
4. Install necessary dependencies in your directory. Start by switching to the front-end folder.
### `npm start`
5. Run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Back-end

### `cd ./backend`
1. Start by switching to the back-end folder.
### `pip install Flask`
### `pip install opencv-python`
### `pip install tk`
2. Install necessary software for the flask api.
### `flask run`
3. Now you can run your backend in development mode.\
Open [http://localhost:5000/results](http://localhost:5000/results) to view it in your browser.\
The user interface will reload when you make changes to the flask api.\
You may also see any lint errors in the console.
4. Setup [Docker](https://docs.docker.com/get-docker/) and [MongoDB](https://www.mongodb.com/docs/manual/installation/) with the linked instructions.
### `docker build`
5. Start up the Mongo Database using the dockerfile.
## Running the entire project
Run the docker image for MongoDB, the Flask backend, the React frontend, and the Intel DevCloud scripts simultaneously to view the Deepfake Detection results in real time on your local web application.\
When preparing to run with the DevCloud scripts running, ensure that the scp target in the /backend/base.py file matches the folders you have setup in your Intel DevCloud.
