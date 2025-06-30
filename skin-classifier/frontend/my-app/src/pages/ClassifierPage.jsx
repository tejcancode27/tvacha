import React, { useState } from 'react';
import axios from 'axios';

const CLASS_LABELS = {
  akiec: "Actinic Keratoses (Pre-cancerous Lesion)",
  bcc: "Basal Cell Carcinoma (Common Skin Cancer)",
  bkl: "Benign Keratosis (Non-cancerous Lesion)",
  df: "Dermatofibroma (Fibrous Skin Lesion)",
  mel: "Melanoma (Serious Skin Cancer)",
  nv: "Melanocytic Nevus (Mole)",
  vasc: "Vascular Lesion (Blood Vessel Lesion)",
};

const ClassifierPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [probabilities, setProbabilities] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPrediction(null);
      setConfidence(null);
      setProbabilities(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('file', selectedImage);

    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      const predictedClass = response.data.predicted_class;
      const scientificWithCommon = CLASS_LABELS[predictedClass] ;

      setPrediction(`${predictedClass} - ${scientificWithCommon}`);
      setConfidence(response.data.confidence);
      setProbabilities(response.data.all_class_probabilities);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction("Prediction failed.");
    }
    setLoading(false);
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: 'linear-gradient(to bottom right, #2c2c2c, #003366)',
        minHeight: '100vh',
        color: 'white',
      }}
    >
      <div className="container text-center">
        <h2 className="mb-4">Skin Classifier</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control mb-3"
        />

        {previewUrl && (
          <div className="mb-4">
            <img
              src={previewUrl}
              alt="Selected"
              className="img-thumbnail"
              style={{ maxWidth: '500px' }}
            />
          </div>
        )}

        <button
          className="btn btn-primary mb-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>

        {prediction && (
          <div className="card mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-body bg-dark text-white">
              <h5 className="card-title">Prediction Result</h5>
              <p className="card-text">
                <strong>Class:</strong> {prediction}<br />
                <strong>Confidence:</strong> {confidence}%
              </p>

              {probabilities && (
                <div className="text-start mt-3">
                  <h6>All Class Probabilities:</h6>
                  <ul>
                    {Object.entries(probabilities).map(([className, prob]) => (
                      <li key={className}>
                        {className} - {CLASS_LABELS[className] }: {prob}%
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassifierPage;
