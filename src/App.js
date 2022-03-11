/** @jsxImportSource @emotion/react */


import React, {useState} from 'react';
import { useFilePicker } from "use-file-picker";
import Spinner from './components/Spinner';
import useResults from './hooks/useResults';
// https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i

import { Global, css } from '@emotion/react'

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400&display=swap');

  body {
    font-family: 'Source Sans Pro', sans-serif;
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
        top: 650px;
        right: 490px;
        font-family: "Georgia", serif;
        height: 20px;
    }
    
    #input:focus {
        background-color: #dbdbdd;
    }

`;
function App() {
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    multiple: false,
    readAs: 'DataURL',
    accept: '.txt, .mp4'
  });
  const [url, setUrl] = useState('');
  const [output, setOutput] = useState('');
  const [result, isLoading, error] = useResults(output)
  if (errors.length > 0) return <p>Error!</p>;
  if (loading) return <Spinner />
  return (
    <div>
      <Global styles={globalStyles} />
      <div>
        <button id ="upload" onClick={() => openFileSelector()}>Upload</button>
        <form onSubmit={(e) => {
          e.preventDefault();
          setOutput(encodeURIComponent(url));
        }}>
          <div id="box_upload">
            <input id="input" value={url} onInput={e => setUrl(e.target.value)} />
            <button id ="copyfilepath" type="submit">Copy file path</button>
          </div>
        </form>
        {console.log(output)}
        <div>{result}</div>
      </div>
    </div>
  );
}

export default App;
