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
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 300;
    margin: 0;
  }
  #upload {
    position: absolute;
    right: 0px;
    top: 630px;
    width: 400px;
    height: 70px;
    background-color: #66676d;
    color: white;
    font-family: "Georgia", serif;
  }

  #upload:hover {
    background-color: #dbdbdd;
    cursor: pointer;
    width: 400px;
    height: 70px;
    position: fixed;
    color: black;
  }

  #upload:active {
    background-color: #dbdbdd;
  }

  #copyfilepath {
    position: absolute;
    top: 650px;
    right: 400px;
    font-family: "Georgia", serif;
    background-color: #66676d;
    color: white;
    width: 100px;
    height: 30px;
  }

  #copyfilepath:hover {
    background-color: #dbdbdd;
    cursor: pointer;
    width: 100px;
    height: 30px;
    position: fixed;
    color: black;
  }

  #input {
    position: absolute;
    top: 651px;
    right: 500px;
    font-family: "Georgia", serif;
    height: 20px;
  }

  #input:focus {
    background-color: #dbdbdd;
  }
`;

const results = css`
  margin-left: 40px;
  margin-top: 200px;
  color: white;
`;

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
          id="upload"
          onClick={(e) => {
            e.preventDefault();
            setClick(Date.now());
          }}
        >
          Select File
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOutput({ path: encodeURIComponent(url), time: Date.now() });
          }}
        >
          <div id="box_upload">
            <input
              id="input"
              value={url}
              onInput={(e) => setUrl(e.target.value)}
            />
            <button id="copyfilepath" type="submit">
              Upload
            </button>
          </div>
        </form>
        {console.log(output)}
        <div css={results}>
          <b>Results!</b>
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
        <img src={require("./components/first_frame.jpg")} />
        {isLoading ? <Spinner></Spinner> : <div></div>}
      </div>
    </div>
  );
}

export default App;
