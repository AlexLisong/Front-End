import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [links, setLinks] = useState('');
    const [file1, setFiles] = useState(null);
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('links', links);
        if (file1 && file1.length > 0) {
            for (let i = 0; i < file1.length; i++) {
                formData.append('files', file1[i]);
            }
        }
        try {
            const response = await axios.post('https://chat-api.cryptoslam.dev/post_content', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(JSON.stringify(response.data, null, 2));
        } catch (error) {
            console.error('Error during API request', error);
            setResult('Error: ' + error.message);
        }
    };

    const handleFileChange = (e) => {
      setFiles(e.target.files);
  };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px',
    };

    const textAreaStyle = {
        width: '60%',
        height: '100px',
        marginBottom: '10px',
    };

    const buttonStyle = {
        marginTop: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
    };

    const resultStyle = {
        marginTop: '20px',
        textAlign: 'left',
        maxWidth: '60%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
    };

    return (
      <div style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit} style={formStyle}>
              <textarea
                  style={textAreaStyle}
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  placeholder="Enter text here..."
              />
              <br />
              <input type="file" multiple onChange={handleFileChange} />
              <br />
              <button style={buttonStyle} type="submit">Submit</button>
          </form>
          {result && (
              <div style={resultStyle}>
                  <h3>Result:</h3>
                  <pre>{result}</pre>
              </div>
          )}
      </div>
  );
}

export default App;
