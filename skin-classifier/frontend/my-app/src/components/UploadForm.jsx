import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please upload an image.");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await axios.post("http://localhost:5000/predict", formData);
      setResult(res.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit for Prediction
        </button>
      </form>
      {result && (
        <div className="mt-4 text-center">
          <p className="text-lg">Prediction:</p>
          <p className="text-2xl font-semibold text-green-400">{result}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
