import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const symptomsData = [
  { name: 'Itching' },
  { name: 'Redness' },
  { name: 'Dry patches' },
  { name: 'Swelling' },
  { name: 'Pain' },
  { name: 'Bleeding' },
  { name: 'Mole changes' },
];

const remedies = {
  Itching: {
    mild: "Apply a soothing lotion and avoid scratching. If it continues, consult a dermatologist.",
    moderate: "Use over-the-counter antihistamines and moisturizers. Monitor closely.",
    severe: "Seek medical advice immediately. It could indicate an underlying issue.",
  },
  Redness: {
    mild: "Use aloe vera gel and avoid irritants.",
    moderate: "Apply anti-inflammatory creams. Monitor skin closely.",
    severe: "Visit a dermatologist as it may indicate an infection or allergic reaction.",
  },
  'Dry patches': {
    mild: "Apply moisturizer twice daily.",
    moderate: "Use medicated cream and increase hydration.",
    severe: "Consult a dermatologist for potential eczema or psoriasis.",
  },
  Swelling: {
    mild: "Apply a cold compress and rest the area.",
    moderate: "Use anti-inflammatory creams or OTC medication.",
    severe: "Seek medical help to rule out infection or allergic reaction.",
  },
  Pain: {
    mild: "Use a mild pain-relieving cream.",
    moderate: "Take OTC pain relievers. Avoid triggers.",
    severe: "Visit a doctor to diagnose the source of pain.",
  },
  Bleeding: {
    mild: "Keep the area clean and use a bandage.",
    moderate: "Use antiseptic cream and monitor healing.",
    severe: "Get immediate medical attention for uncontrolled bleeding.",
  },
  'Mole changes': {
    mild: "Observe changes and note size/color.",
    moderate: "Schedule a dermatologist visit for examination.",
    severe: "High risk of malignancy. Immediate medical evaluation required.",
  },
};

const SymptomsPage = () => {
  const [selections, setSelections] = useState({});
  const [showTips, setShowTips] = useState({});
  const [result, setResult] = useState(null);

  const handleSeverityChange = (symptom, severity) => {
    setSelections({ ...selections, [symptom]: severity });
    setShowTips({ ...showTips, [symptom]: true });
  };

  const calculateSeverity = () => {
    let counts = { mild: 0, moderate: 0, severe: 0 };
    Object.values(selections).forEach((severity) => {
      counts[severity]++;
    });

    if (counts.severe >= 2 || (counts.moderate >= 3 && counts.severe >= 1)) {
      return 'High';
    } else if (counts.moderate >= 2 || counts.severe === 1) {
      return 'Medium';
    } else {
      return 'Low';
    }
  };

  const getFinalMessage = (severity) => {
    if (severity === 'Low') return 'Home remedies should be enough.';
    if (severity === 'Medium') return 'If symptoms persist, consult a doctor.';
    return 'Consult a doctor immediately. You may need specialist assistance.';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const severity = calculateSeverity();
    const message = getFinalMessage(severity);
    setResult({ severity, message });
  };

  return (
    <div
      className="container-fluid px-0"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #1f1f1f, #0f4c81)',
        color: 'white',
        fontFamily: 'Segoe UI, sans-serif',
        padding: '40px 20px'
      }}
    >
      {/* Title */}
      <div className="text-center mb-5">
        <h1 style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: '34px' }}>
          SYMPTOM SEVERITY CHECKER
        </h1>
      </div>

      {/* Form Section */}
      <div
        className="mx-auto"
        style={{
          maxWidth: '850px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 0 12px rgba(0,0,0,0.3)'
        }}
      >
        <form onSubmit={handleSubmit}>
          {symptomsData.map((symptom, idx) => (
            <div key={idx} className="mb-4">
              <h5 className="mb-2">{symptom.name}</h5>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name={symptom.name}
                  id={`${symptom.name}-mild`}
                  onChange={() => handleSeverityChange(symptom.name, 'mild')}
                />
                <label className="form-check-label" htmlFor={`${symptom.name}-mild`}>Mild</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name={symptom.name}
                  id={`${symptom.name}-moderate`}
                  onChange={() => handleSeverityChange(symptom.name, 'moderate')}
                />
                <label className="form-check-label" htmlFor={`${symptom.name}-moderate`}>Moderate</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name={symptom.name}
                  id={`${symptom.name}-severe`}
                  onChange={() => handleSeverityChange(symptom.name, 'severe')}
                />
                <label className="form-check-label" htmlFor={`${symptom.name}-severe`}>Severe</label>
              </div>

              {showTips[symptom.name] && selections[symptom.name] && (
                <p className="mt-2" style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#f8f9fa' }}>
                  <strong>Tip:</strong> {remedies[symptom.name][selections[symptom.name]]}
                </p>
              )}
            </div>
          ))}

          <div className="text-center mt-5">
            <button type="submit" className="btn btn-light btn-lg px-4">Check Severity</button>
          </div>
        </form>

        {result && (
          <div className="mt-5 text-center">
            <h4>Overall Severity: <span className="text-warning">{result.severity}</span></h4>
            <p style={{ fontSize: '1.1rem' }}>{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomsPage;
