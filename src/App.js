/** @jsxImportSource @emotion/react */

import React, { useState, useEffect, useRef } from "react";
import Spinner from "./components/Spinner";
import ReactPlayer from "react-player";
import useResults from "./hooks/useResults";
import useFile from "./hooks/useFile";
// https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i

import { Global, css } from "@emotion/react";
const globalStyles = css`
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400&display=swap");

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    margin: 0;
  }

  #select {
    position: absolute;
    right: 0px;
    top: 820px;
    width: 300px;
    height: 80px;
    background-color: #66676d;
    color: white;
    font-size: 20px;
  }

  #select:hover {
    background-color: #dbdbdd;
    cursor: pointer;
    color: black;
  }

  #select:active {
    background-color: #dbdbdd;
  }

  #upload {
    position: absolute;
    top: 855px;
    right: 300px;
    font-size: 20px;
    background-color: #66676d;
    color: white;
    width: 150px;
    height: 40px;
  }

  #upload:hover {
    background-color: #dbdbdd;
    cursor: pointer;
    color: black;
  }

  #input {
    position: absolute;
    top: 855px;
    right: 450px;
    font-size:20px;
    height: 30px;
    width: 305px;
  }

  #input:focus {
    background-color: #dbdbdd;
  }
    
/* The Overlay (background) */
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */
  height: 100%;
  width: 0;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(255,255,255); /* Black fallback color */
  background-color: rgba(255,255,255, 0.95); /* Black w/opacity */
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}
.img_desc {
    position: relative;
    top: 100px;
    margin-top: 0px;
    text-align: center;
    font-size:40px;
    padding-bottom: 30px;
}

#snapshot {
  position: relative;
    top: 100px;
    left: 250px;
    margin-top: 0px;
}

/* Position the content inside the overlay */
#overlay-content {
    position: relative;
    top: 150px;
    text-align: center;
    color: black;
    font-size:20px;
}

#spin {
    position: relative;
    top: 120px;
    text-align: center;
}

/* The navigation links inside the overlay */
.overlay a {
  padding: 8px;
  text-decoration: none;
  font-size: 36px;
  color: #818181;
  display: block; /* Display block instead of inline */
  transition: 0.3s; /* Transition effects on hover (color) */
}

/* When you mouse over the navigation links, change their color */
.overlay a:hover, .overlay a:focus {
  color: blue;
}

/* Position the close button (top right corner) */
.overlay .closebtn {
  position: absolute;
  top: 5px;
  right: 45px;
  font-size: 60px;
    
}

/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap
@media screen and (max-height: 450px) {
  .overlay a {font-size: 20px}
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
} dont think this is needed */
`;

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function App() {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState({ path: "", time: "" });
  const [result, isLoading, error] = useResults(output);
  const [click, setClick] = useState("");
  const [resultPath, isLoadingPath, errorPath] = useFile(click);
  const isMounted = useRef(false);
  useEffect(() => {
    setUrl(resultPath);
  }, [resultPath]);
  return (
    <div>
      <Global styles={globalStyles} />
      <div>
        <button
          id="select"
          onClick={(e) => {
            e.preventDefault();
            setClick(Date.now());
            openNav();
          }}
        >
          Select File
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOutput({ path: encodeURIComponent(url), time: Date.now() });
            openNav()
          }}
        >
          <div id="box_upload">
            <input
              id="input"
              value={url}
              onInput={(e) => setUrl(e.target.value)}
            />
            <button id="upload" type="submit" onclick="openNav()">Upload</button>
          </div>
        </form>
        <div id="myNav" class="overlay">
          <a href="javascript:void(0)" class="closebtn" onClick={(e) => {closeNav();}}>&times;</a>
          {console.log(output)}
          <div class="img_desc">Snapshot of the video:</div>
          <img id="snapshot" src={require("./components/first_frame.jpg")} />
          <div id="spin">{isLoading ? <Spinner></Spinner> : <div></div>} </div>
          <div id="overlay-content">
            <div>Results</div>
            <div>{result[0]}</div>
            <div>{result[1]}</div>
            <div>{result[2]}</div>
            <div>{result[3]}</div>
            <div>---</div>
            <div>{result[4]}</div>
            <div>{result[5]}</div>
            <div>{result[6]}</div>
            <div>{result[7]}</div>
            <div>---</div>
            <div>{result[8]}</div>
            <div>{result[9]}</div>
            <div>{result[10]}</div>
            <div>{result[11]}</div>
        </div>
      </div>
     </div>
    </div>
  );
}

export default App;
