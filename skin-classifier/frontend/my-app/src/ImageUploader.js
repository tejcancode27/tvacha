import React, { useState } from "react";
import axios from "axios";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);
      setResult(response.data);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Skin Disease Classifier</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Predict</button>

      {result && (
        <div>
          <h3>Result:</h3>
          <p>Class: {result.class}</p>
          <p>Confidence: {Math.round(result.confidence * 100)}%</p>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
