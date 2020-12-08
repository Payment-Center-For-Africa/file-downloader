import downloadFileDisposition, {
  downloadFile,
} from '@mohcinenazrhan/file-downloader';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  function donwloadFile(fileName) {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/file',
      responseType: 'blob',
    })
      .then((response) => {
        if (response.data instanceof Blob) {
          if (fileName) {
            downloadFile(response.data, fileName);
          } else {
            const disposition = response.request.getResponseHeader(
              'Content-Disposition',
            );
            if (disposition) {
              downloadFileDisposition(
                response.data,
                disposition,
                'my-file.pdf',
              );
            } else {
              throw new Error('Content-Disposition header is missing');
            }
          }
        } else {
          throw new Error('Response data is not an instance of Blob');
        }
      })
      .catch((error) => {
        console.log('donwloadFile error: ', error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Using Content-Disposition header to get the file name and extension.
        </p>
        <button onClick={() => donwloadFile()}>
          Download File (Content-Disposition)
        </button>
        <br />
        <p>Using custom file name and extension.</p>
        <button onClick={() => donwloadFile('custom-name.pdf')}>
          Download File
        </button>
      </header>
    </div>
  );
}

export default App;
