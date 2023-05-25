import React, { useState } from 'react';
import axios from 'axios';

var url = 'http://localhost:3000/summarize';

function FileUpload(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryText, setSummaryText] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Create a new FormData object
      const formData = new FormData();

      // Append the selected file to the formData object
      formData.append('file', selectedFile);
      console.log(selectedFile);
      // Send the formData to the server (you can use Axios, fetch, or any other HTTP library)
      // Replace '<upload-url>' with your actual upload endpoint URL
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
                console.log(response.data.summary);
                setSummaryText(response.data.summary);
            })
        .catch((error) => {
            // Handle any errors that occurred during the upload
            console.error('Error uploading file', error);
            })
  }
}

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{summaryText}</p>
    </div>
  );
}

export default FileUpload;
