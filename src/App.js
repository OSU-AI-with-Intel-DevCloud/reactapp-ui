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
        <button onClick={() => openFileSelector()}>Copy file path</button>
        <form onSubmit={(e) => {
          e.preventDefault();
          setOutput(encodeURIComponent(url));
        }}>
          <input value={url} onInput={e => setUrl(e.target.value)} />
          <button type="submit">Upload</button>
        </form>
        {console.log(output)}
        <div>{result}</div>
      </div>
    </div>
  );
}

export default App;